//
//  EventManager.swift
//  ERNTemplate
//
//  Created by 王亮 on 2021/4/16.
//

import Foundation
import React

@objc(ERNNativeEventManager)
class ERNNativeEventManager: RCTEventEmitter {
    private static var instance: ERNNativeEventManager?

    static func getInstance() -> ERNNativeEventManager {
        if let _instance = instance {
            return _instance
        }
        return ERNNativeEventManager()
    }

    override init() {
        super.init()

//       Register native events
        for evt in RCTEvents.all {
            addListener(evt)
        }

        bridge = RCTRootViewManager.bridge()
    }

    override class func requiresMainQueueSetup() -> Bool {
        return false
    }

    override func supportedEvents() -> [String] {
        return RCTEvents.all
    }

    static func sendEvent(event: RCTEvents, body: [String: Any]? = nil) {
        getInstance().sendEvent(withName: event.rawValue, body: body)
    }
}
