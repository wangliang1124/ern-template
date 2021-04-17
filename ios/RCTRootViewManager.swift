//
//  RCTRootViewManager.swift
//  ERNTemplate
//
//  Created by 王亮 on 2021/4/16.
//

import Foundation
import React

import Foundation

class RCTRootViewManager: NSObject {
    private static var _bridge: RCTBridge?
    private static var rootViewMap = {
        [String: RCTRootView]()
    }()

    static var rootViewController: UIViewController?

    static var RCTBundleURL: URL = {
        #if DEBUG
            return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index", fallbackResource: nil)
        #else
            return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
        #endif
    }()

    static func bridge() -> RCTBridge? {
        if let bridge = _bridge {
            return bridge
        }

        _bridge = RCTBridge(bundleURL: RCTBundleURL, moduleProvider: nil, launchOptions: nil)

        return _bridge
    }

    static func initBridge() {
        _bridge = RCTBridge(bundleURL: RCTBundleURL, moduleProvider: nil, launchOptions: nil)
    }

    static func rctRootView(withName moduleName: RCTViews, data: [String: Any]? = nil, preLoad: Bool = false) -> RCTRootView {
        if preLoad {
            if let rootView = rootViewMap[moduleName.rawValue] {
                return rootView
            }
            let rootView = rctRootView(withName: moduleName, data: data)
            rootViewMap[moduleName.rawValue] = rootView

            return rootView
        }
        return rctRootView(withName: moduleName, data: data)
    }

    static func rctRootView(withName moduleName: RCTViews, data: [String: Any]? = nil) -> RCTRootView {
        var rootView: RCTRootView
        if let bridge = bridge() {
            rootView = RCTRootView(
                bridge: bridge,
                moduleName: moduleName.rawValue,
                initialProperties: data)
        } else {
            rootView = RCTRootView(frame: .zero)
        }

        if #available(iOS 13.0, *) {
            rootView.backgroundColor = UIColor.systemBackground
        } else {
            rootView.backgroundColor = UIColor.white
        }

        return rootView
    }

    static func preLoadRCTRootView(withName moduleName: String) {
        preLoadRCTRootView(withName: moduleName, initialProperty: nil)
    }

    static func preLoadRCTRootView(withName moduleName: String, initialProperty: [AnyHashable: Any]?) {
        if rootViewMap[moduleName] != nil {
            return
        }

        guard let bridge = bridge() else {
            return
        }

        let rootView = RCTRootView(
            bridge: bridge,
            moduleName: moduleName,
            initialProperties: initialProperty)

        if #available(iOS 13.0, *) {
            rootView.backgroundColor = UIColor.systemBackground
        } else {
            rootView.backgroundColor = UIColor.white
        }

        rootViewMap[moduleName] = rootView
    }

    static func rctRootViewController() -> UIViewController {
        let rctRootVC = UIViewController()
        rctRootVC.title = "Edison React Native Template"
        rctRootVC.view = rctRootView(withName: .ERNTemplate, data: ["teskToken": "aGVsbG8sd29ybGQ="])
        rctRootVC.navigationController?.setNavigationBarHidden(true, animated: true)
        rctRootVC.modalPresentationStyle = .fullScreen
        rctRootVC.modalTransitionStyle = .coverVertical
        rootViewController = rctRootVC
        return rctRootVC
    }

    static func popScreen() {
        if let vc = rootViewController {
            vc.dismiss(animated: true, completion: nil)
            vc.navigationController?.popViewController(animated: true)
        }
    }
}
