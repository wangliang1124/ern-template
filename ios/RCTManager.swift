//
//  RCTManager.swift
//  ERNTemplate
//
//  Created by 王亮 on 2021/4/14.
//

import Foundation


class RCTManager {
  static var ernModule: ERNModule?
  
  static func sendEvent(event: RCTEvents, body: [String: Any]? = nil) {
    ernModule?.sendEvent(withName: event.rawValue, body: body)
  }
}
