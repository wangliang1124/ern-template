//
//  AppDelegate.swift
//  ERNTemplate
//
//  Created by 王亮 on 2021/4/14.
//

import Foundation
import React

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
class AppDelegate: UIResponder, UIApplicationDelegate, RCTBridgeDelegate {
    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil) -> Bool {
        // #if FB_SONARKIT_ENABLED
//        InitializeFlipper(application)
        // #endif
      
        var rootView = UIView(frame: .zero)
        if let bridge = RCTBridge(delegate: self, launchOptions: launchOptions) {
            rootView = RCTRootView(
                bridge: bridge,
                moduleName: "ERNTemplate",
                initialProperties: nil)

            if #available(iOS 13.0, *) {
                rootView.backgroundColor = UIColor.systemBackground
            } else {
                rootView.backgroundColor = UIColor.white
            }
        }

        window = UIWindow(frame: UIScreen.main.bounds)
        let rootViewController = UIViewController()
        rootViewController.view = rootView
        window?.rootViewController = rootViewController
        window?.makeKeyAndVisible()

        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
            RCTManager.sendEvent(event: .AppOpened)
        }
      
        return true
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        RCTManager.sendEvent(event: .AppOpened)
    }

    func sourceURL(for bridge: RCTBridge?) -> URL? {
        #if DEBUG
            return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index", fallbackResource: nil)
        #else
            return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
        #endif
    }
}
