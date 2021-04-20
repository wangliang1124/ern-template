//
//  RCTEvents.swift
//  ERNTemplate
//
//  Created by 王亮 on 2021/4/14.
//

import Foundation

enum RCTEvents: String, CaseIterable {
    case AppOpened
    case EventReminder
    case TimerCount

    static var all: [String] {
        return allCases.map({ $0.rawValue })
    }
}
