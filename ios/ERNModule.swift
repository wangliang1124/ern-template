//
//  ERNModule.swift
//  ERNTemplate
//
//  Created by 王亮 on 2021/4/13.
//

import Foundation

@objc(ERNModule)
class ERNModule: NSObject {
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
        EventManager.sendEvent(event: .EventReminder, body: ["testKey": 42])
    }

    @objc(popScreen)
    func popScreen() {
        DispatchQueue.main.async {
            RCTRootViewManager.popScreen()
        }
    }

    @objc(gotoNative)
    func gotoNative() {
        DispatchQueue.main.async {
            if let rctVc = RCTRootViewManager.rootViewController {
                let mainVc = MainViewController()
                rctVc.navigationController?.pushViewController(mainVc, animated: true)
                rctVc.navigationController?.setNavigationBarHidden(false, animated: true)
            }
        }
    }
}
