//
//  TestModule.h
//  ERNTemplate
//
//  Created by 王亮 on 2021/4/14.
//

#import <React/RCTBridgeModule.h>

#ifdef __cplusplus

#import "example.h"

#endif

@interface CppModule : NSObject <RCTBridgeModule>

@end

