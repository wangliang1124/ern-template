//
//  Light.swift
//
//  Created by 王亮 on 2019/2/28.
//  Copyright © 2019年 Facebook. All rights reserved.
//

import Foundation

@objc(Light)
class Light: RCTViewManager {
    override func view() -> UIView! {
        return LightView()
    }
}
