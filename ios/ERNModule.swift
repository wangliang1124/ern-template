//
//  ERNModule.swift
//  ERNTemplate
//
//  Created by 王亮 on 2021/4/13.
//

import Foundation

@objc(ERNModule)
class ERNModule : NSObject{
  
  @objc(doExpensiveLoop:resove:reject:)
  func doExpensiveLoop(loopTimes: Double, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock)  {
    DispatchQueue.global(qos: .default).async {
      var i = 0.0
      while i < loopTimes {
        i += 1
      }
      resolve([])
    }
  };
}
