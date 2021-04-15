//
//  LightView.swift
//
//  Created by 王亮 on 2019/2/28.
//  Copyright © 2019年 Facebook. All rights reserved.
//

import UIKit

class LightView: UIView {
    lazy var button: UIButton = {
        let button = UIButton(type: .system)
        button.titleLabel?.font = UIFont.systemFont(ofSize: 20)
        button.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        button.addTarget(
            self,
            action: #selector(changeBulbStatus),
            for: .touchUpInside
        )
        return button
    }()

    @objc var isOn: Bool = false {
        didSet {
            button.setTitle(String(describing: isOn ? "Switch Off" : "Switch On"), for: .normal)
            button.backgroundColor = isOn ? .yellow : .black
        }
    }

    @objc var onStatusChange: RCTDirectEventBlock?

    @objc func changeBulbStatus() {
        isOn = !isOn as Bool

        if let onStatusChange = onStatusChange {
            onStatusChange(["isOn": isOn])
        }
    }

    override init(frame: CGRect) {
        super.init(frame: frame)
        addSubview(button)
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init has not been implemented")
    }
}
