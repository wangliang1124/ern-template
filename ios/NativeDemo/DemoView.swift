//
//  MainView.swift
//  ERNTemplate
//
//  Created by 王亮 on 2021/4/15.
//

import UIKit

class MainView: UIView {
    var viewController: MainViewController?
    lazy var button: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Goto RN Screen", for: .normal)
        button.titleLabel?.font = UIFont.systemFont(ofSize: 20)
        button.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        button.addTarget(
            self,
            action: #selector(gotoRN),
            for: .touchUpInside
        )
        return button
    }()

    @objc func gotoRN() {
        let rctVC = UIViewController()
        rctVC.view = RCTRootViewManager.rctRootView(withName: .Gallery)

//       let vc = RCTRootViewManager.rctRootViewController()
//      viewController?.navigationController?.setNavigationBarHidden(true, animated: true)
//       原生到 RN
        viewController?.navigationController?.pushViewController(rctVC, animated: true)

//       Gallery 页面有下拉刷新，所以下拉无法关闭，只能添加额外的按钮来关闭
//        viewController?.present(rctVC, animated: true, completion: nil)

//      如果当前页面是 present 出来, 下面这么做有问题
//          if let nav = viewController?.presentingViewController as? UINavigationController {
//            nav.pushViewController(rctVC, animated: true)
//          }
//        或者这样 navigationController 是 nil
//      viewController?.navigationController?.pushViewController(rctVC, animated: true)

//      RCTRootViewManager.popScreen()
    }

    override init(frame: CGRect) {
        super.init(frame: frame)
        backgroundColor = .white
        addSubview(button)
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init has not been implemented")
    }
}
