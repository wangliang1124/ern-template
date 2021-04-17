//
//  MainViewController.swift
//  ERNTemplate
//
//  Created by 王亮 on 2021/4/15.
//

import UIKit

class MainViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        // 预加载 RN 页面
        // RCTRootViewManager.preLoadRCTRootView(withName: "ERNTemplate")
        title = "Native Screen Demo"
    }

    override func loadView() {
        let mainView = MainView()
        mainView.viewController = self
        view = mainView
    }
}
