//
//  ERNModule.m
//  ERNTemplate
//
//  Created by 王亮 on 2021/4/13.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>


//@interface ERNModule : NSObject<RCTBridgeModule>
@interface RCT_EXTERN_MODULE(ERNModule, NSObject)

//RCT_EXPORT_MODULE();
// 这个方法不会达到想要的效果
RCT_EXPORT_METHOD(EdoBGThread:(RCTResponseSenderBlock) callback)
{
  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    callback(@[]);
  });
}

RCT_EXTERN_METHOD(doExpensiveLoop: (double)loopTimes resove: (RCTPromiseResolveBlock)resove reject: (RCTPromiseRejectBlock)reject)

@end
