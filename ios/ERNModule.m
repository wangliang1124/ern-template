//
//  ERNModule.m
//  ERNTemplate
//
//  Created by 王亮 on 2021/4/13.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE (ERNModule, NSObject)

RCT_EXTERN_METHOD(doExpensiveLoop : (double)loopTimes
			  withResolver : (RCTPromiseResolveBlock) resove
				  withRejecter : (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(multiply : (float) a withB : (float) b
				  withResolver : (RCTPromiseResolveBlock) resolve
					  withRejecter : (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(sendTestEvent)

@end
