import AppKit
import AVFoundation
import CoreGraphics
import Carbon

final class Macing: NSObject, NSApplicationDelegate {
    private let status = NSStatusBar.system.statusItem(withLength: NSStatusItem.squareLength)
    private let defaults = UserDefaults.standard
    private let sounds = [
        ("Halo · Soft", "halo-soft"),
        ("Halo · Firm", "halo-hard"),
        ("Halo · Shift", "halo-shift"),
        ("Halo · Space", "halo-space"),
        ("Hi75 · Soft", "hi75-soft"),
        ("Hi75 · Medium", "hi75-medium"),
        ("Hi75 · Firm", "hi75-hard"),
        ("Hi75 · Space", "hi75-space"),
        ("Hi75 · Knob", "hi75-knob"),
        ("ASUS · Soft", "asus-kbd-soft"),
        ("ASUS · Medium", "asus-kbd-medium"),
        ("ASUS · Firm", "asus-kbd-hard"),
        ("ASUS · Space", "asus-kbd-space"),
        ("UHK · Soft", "uhk-soft"),
        ("UHK · Medium", "uhk-medium"),
        ("UHK · Space", "uhk-space")
    ]
    private struct Pack {
        let name: String
        let typing: String
        let space: String
        let shift: String?
    }
    private let packs = [
        Pack(name: "Halo", typing: "halo-soft", space: "halo-space", shift: "halo-shift"),
        Pack(name: "Hi75", typing: "hi75-soft", space: "hi75-space", shift: nil),
        Pack(name: "ASUS", typing: "asus-kbd-soft", space: "asus-kbd-space", shift: nil),
        Pack(name: "Ultimate Hacking Keyboard", typing: "uhk-soft", space: "uhk-space", shift: nil)
    ]
    private var packIndex = 0
    private var pack: Pack { packs[packIndex] }
    private var overrides: [String: String] {
        get { defaults.dictionary(forKey: "soundOverrides") as? [String: String] ?? [:] }
        set { defaults.set(newValue, forKey: "soundOverrides") }
    }

    private func sound(for role: String) -> String {
        if let override = overrides["\(pack.name).\(role)"] { return override }
        switch role {
        case "Space": return pack.space
        case "Shift": return pack.shift ?? sound(for: "Typing")
        default: return pack.typing
        }
    }
    private var enabled = true
    private var players: [String: [AVAudioPlayer]] = [:]
    private var eventTap: CFMachPort?
    private var permissionTimer: Timer?
    private var listenerStatus = "Starting" {
        didSet {
            if oldValue != listenerStatus {
                defaults.set(listenerStatus, forKey: "listenerStatus")
            }
        }
    }

    func applicationDidFinishLaunching(_ notification: Notification) {
        enabled = defaults.object(forKey: "enabled") as? Bool ?? true
        if let savedPack = defaults.string(forKey: "pack"),
           let savedIndex = packs.firstIndex(where: { $0.name == savedPack }) {
            packIndex = savedIndex
        } else if let previousSound = defaults.string(forKey: "sound"),
                  let previousPack = packs.firstIndex(where: {
                      previousSound.split(separator: "-").first == $0.typing.split(separator: "-").first
                  }) {
            packIndex = previousPack
            overrides["\(pack.name).Typing"] = previousSound
        }
        defaults.set(pack.name, forKey: "pack")
        loadSounds()
        refreshMenu()
        if enabled { startListening(requestPermission: true) }
    }

    private func loadSounds() {
        players = [:]
        for name in Set(["Typing", "Space", "Shift"].map { sound(for: $0) }) {
            guard let url = Bundle.main.url(forResource: name, withExtension: "wav") else { continue }
            players[name] = (0..<8).compactMap { _ in
                guard let player = try? AVAudioPlayer(contentsOf: url) else { return nil }
                player.prepareToPlay()
                return player
            }
        }
    }

    private func playSound(for role: String) {
        guard let pool = players[sound(for: role)],
              let player = pool.first(where: { !$0.isPlaying }) ?? pool.first else { return }
        player.currentTime = 0
        player.play()
    }

    private func startListening(requestPermission: Bool) {
        guard enabled, eventTap == nil else { return }
        if !CGPreflightListenEventAccess() {
            listenerStatus = "Input Monitoring permission needed"
            refreshMenu()
            if requestPermission { CGRequestListenEventAccess() }
            if permissionTimer == nil {
                permissionTimer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { [weak self] _ in
                    self?.startListening(requestPermission: false)
                }
            }
            return
        }

        let mask = (CGEventMask(1) << CGEventType.keyDown.rawValue)
            | (CGEventMask(1) << CGEventType.flagsChanged.rawValue)
        guard let tap = CGEvent.tapCreate(
            tap: .cgSessionEventTap, place: .headInsertEventTap, options: .listenOnly,
            eventsOfInterest: mask, callback: { _, type, event, context in
                let app = Unmanaged<Macing>.fromOpaque(context!).takeUnretainedValue()
                app.handleEvent(type, event: event)
                return Unmanaged.passUnretained(event)
            }, userInfo: Unmanaged.passUnretained(self).toOpaque()
        ), let source = CFMachPortCreateRunLoopSource(nil, tap, 0) else {
            listenerStatus = "macOS did not start the keyboard listener"
            refreshMenu()
            return
        }
        permissionTimer?.invalidate()
        permissionTimer = nil
        listenerStatus = "Keyboard listener active"
        eventTap = tap
        CFRunLoopAddSource(CFRunLoopGetMain(), source, .commonModes)
        CGEvent.tapEnable(tap: tap, enable: true)
        refreshMenu()
    }

    private func handleEvent(_ type: CGEventType, event: CGEvent) {
        switch type {
        case .tapDisabledByTimeout, .tapDisabledByUserInput:
            if let eventTap { CGEvent.tapEnable(tap: eventTap, enable: true) }
        case .keyDown:
            guard event.getIntegerValueField(.keyboardEventAutorepeat) == 0 else { return }
            let keyCode = event.getIntegerValueField(.keyboardEventKeycode)
            playSound(for: keyCode == kVK_Space ? "Space" : "Typing")
        case .flagsChanged:
            let keyCode = event.getIntegerValueField(.keyboardEventKeycode)
            // These flags distinguish the two Shift keys when both are held.
            let leftShiftDown = CGEventFlags(rawValue: 0x02)
            let rightShiftDown = CGEventFlags(rawValue: 0x04)
            if (keyCode == kVK_Shift && event.flags.contains(leftShiftDown))
                || (keyCode == kVK_RightShift && event.flags.contains(rightShiftDown)) {
                playSound(for: "Shift")
            }
        default:
            break
        }
    }

    private func refreshMenu() {
        let icon = enabled && eventTap != nil ? "keyboard" : "keyboard.badge.ellipsis"
        status.button?.image = NSImage(systemSymbolName: icon, accessibilityDescription: "Macing")
        status.button?.toolTip = "Macing"
        let menu = NSMenu()
        let toggle = menu.addItem(withTitle: "Typing Sounds", action: #selector(toggleSounds), keyEquivalent: "")
        toggle.target = self
        toggle.state = enabled ? .on : .off
        if enabled && eventTap == nil {
            menu.addItem(withTitle: listenerStatus, action: nil, keyEquivalent: "")
            let permission = menu.addItem(withTitle: "Set Up Input Monitoring…", action: #selector(openPrivacySettings), keyEquivalent: "")
            permission.target = self
        }
        menu.addItem(.separator())
        let packMenu = NSMenu()
        for (index, keyboardPack) in packs.enumerated() {
            let item = packMenu.addItem(withTitle: keyboardPack.name, action: #selector(selectPack(_:)), keyEquivalent: "")
            item.target = self
            item.tag = index
            item.state = index == packIndex ? .on : .off
        }
        let packItem = menu.addItem(withTitle: "Keyboard Pack · \(pack.name)", action: nil, keyEquivalent: "")
        packItem.submenu = packMenu

        for role in ["Typing", "Space", "Shift"] {
            let choices = NSMenu()
            let savedSound = overrides["\(pack.name).\(role)"]
            let defaultChoice = choices.addItem(withTitle: "Pack Default", action: #selector(selectSound(_:)), keyEquivalent: "")
            defaultChoice.target = self
            defaultChoice.representedObject = [role]
            defaultChoice.state = savedSound == nil ? .on : .off
            choices.addItem(.separator())
            for (title, soundName) in sounds {
                let item = choices.addItem(withTitle: title, action: #selector(selectSound(_:)), keyEquivalent: "")
                item.target = self
                item.representedObject = [role, soundName]
                item.state = savedSound == soundName ? .on : .off
            }
            let roleItem = menu.addItem(withTitle: "\(role) Sound", action: nil, keyEquivalent: "")
            roleItem.submenu = choices
        }
        menu.addItem(.separator())
        menu.addItem(withTitle: "Quit Macing", action: #selector(NSApplication.terminate(_:)), keyEquivalent: "q")
        status.menu = menu
    }

    @objc private func toggleSounds() {
        enabled.toggle()
        defaults.set(enabled, forKey: "enabled")
        if enabled {
            startListening(requestPermission: true)
        } else {
            permissionTimer?.invalidate()
            permissionTimer = nil
            if let eventTap { CFMachPortInvalidate(eventTap) }
            eventTap = nil
            players.values.joined().forEach { $0.stop() }
        }
        refreshMenu()
    }

    @objc private func openPrivacySettings() {
        if let url = URL(string: "x-apple.systempreferences:com.apple.preference.security?Privacy_ListenEvent") {
            NSWorkspace.shared.open(url)
        }
    }

    @objc private func selectPack(_ item: NSMenuItem) {
        packIndex = item.tag
        defaults.set(pack.name, forKey: "pack")
        loadSounds()
        playSound(for: "Typing")
        refreshMenu()
    }

    @objc private func selectSound(_ item: NSMenuItem) {
        guard let selection = item.representedObject as? [String], let role = selection.first else { return }
        overrides["\(pack.name).\(role)"] = selection.dropFirst().first
        loadSounds()
        playSound(for: role)
        refreshMenu()
    }
}

let application = NSApplication.shared
let delegate = Macing()
application.delegate = delegate
application.setActivationPolicy(.accessory)
application.run()
