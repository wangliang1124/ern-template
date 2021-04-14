//
//  ERNModule.swift
//  ERNTemplate
//
//  Created by 王亮 on 2021/4/13.
//

import Foundation

@objc(ERNModule)
class ERNModule: RCTEventEmitter {
    

    override init() {
        super.init()
        RCTManager.ernModule = self
    }

    override class func requiresMainQueueSetup() -> Bool {
        return false
    }

    override func supportedEvents() -> [String] {
        return RCTEvents.all
    }

    @objc(doExpensiveLoop:withResolver:withRejecter:)
    func doExpensiveLoop(loopTimes: Double, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.global(qos: .default).async {
            var i = 0.0
            while i < loopTimes {
                i += 1
            }
            resolve("success")
        }
    }

    @objc(multiply:withB:withResolver:withRejecter:)
    func multiply(a: Float, b: Float, resovle: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        resovle(a * b)
    }

    @objc(sendTestEvent)
    func sendTestEvent() {
        RCTManager.sendEvent(event: .EventReminder, body: ["testKey": 42])
    }
}
