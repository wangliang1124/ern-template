#import "CppModule.h"

@implementation CppModule

RCT_EXPORT_MODULE()

// Example method for C++
RCT_EXPORT_METHOD(multiply:(nonnull NSNumber*)a withB:(nonnull NSNumber*)b
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withReject:(RCTPromiseRejectBlock)reject)
{
    NSNumber *result = @(example::multiply([a doubleValue], [b doubleValue]));
    resolve(result);
}

@end
