//
//  AppDelegate.swift
//  ERNTemplate
//
//  Created by 王亮 on 2021/4/14.
//

import Foundation
//
// import FlipperKit
// import FlipperKitLayoutPlugin
// import FlipperKitNetworkPlugin
// import FlipperKitReactPlugin
// import FlipperKitUserDefaultsPlugin
// import React
// import SKIOSNetworkPlugin
//
// #if FB_SONARKIT_ENABLED
//
// private func InitializeFlipper(_ application: UIApplication?) {
//    let client = FlipperClient.shared()
//    let layoutDescriptorMapper = SKDescriptorMapper()
//    client?.add(FlipperKitLayoutPlugin(rootNode: application, with: layoutDescriptorMapper))
//    client?.add(FKUserDefaultsPlugin(suiteName: nil))
//    client?.add(FlipperKitReactPlugin())
//    client?.add(FlipperKitNetworkPlugin(networkAdapter: SKIOSNetworkAdapter()))
//    client?.start()
// }
//
// #endif

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil) -> Bool {
        // #if FB_SONARKIT_ENABLED
//        InitializeFlipper(application)
        // #endif

//         window = UIWindow(frame: UIScreen.main.bounds)
//         let navigationController = UINavigationController(rootViewController: MainViewController())
//         window?.rootViewController = navigationController
//         window?.makeKeyAndVisible()

        window = UIWindow(frame: UIScreen.main.bounds)
        let navigationController = UINavigationController(rootViewController: RCTRootViewManager.rctRootViewController())
        navigationController.setNavigationBarHidden(true, animated: true)
        window?.rootViewController = navigationController
        window?.makeKeyAndVisible()

        // 假如 app 一开始启动的 native 页面，没有启动 RN 页面，但是又需要预先初始化 RCTBridge 以加速 RN 包的加载速度，
        // 可以在这里预先初始化 RCTBridge, 当然实际上，这里并不是唯一会初始化 RCTBridge 的地方
        // 在 RN 中调用原生模块的时候也会触发 RCTBridge 的建立
        // RCTRootViewManager.initBridge()

        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
            EventManager.sendEvent(event: .AppOpened)
        }

        return true
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        EventManager.sendEvent(event: .AppOpened)
    }
}
