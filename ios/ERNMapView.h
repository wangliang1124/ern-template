//
//  ERNMapView.h
//  ERNTemplate
//
//  Created by 王亮 on 2021/4/15.
//

#import <MapKit/MapKit.h>

#import <React/RCTComponent.h>

@interface ERNMapView: MKMapView

@property (nonatomic, copy) RCTBubblingEventBlock onRegionChange;

@end

