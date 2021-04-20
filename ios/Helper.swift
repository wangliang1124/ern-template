//
//  Helper.swift
//  ERNTemplate
//
//  Created by 王亮 on 2021/4/20.
//

import Foundation

class SwiftTimer {
    static var internalTimer: DispatchSourceTimer?

    static func startTimer(handler: (() -> Void)?) {
        internalTimer = DispatchSource.makeTimerSource(queue: .main)

        if let timer = internalTimer {
            timer.schedule(deadline: .now(), repeating: .seconds(1))

            timer.setEventHandler(handler: handler)

            timer.resume()
        }
    }
}
