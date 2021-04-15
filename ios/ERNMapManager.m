//
//  ERNMapManager.m
//  ERNTemplate
//
//  Created by 王亮 on 2021/4/15.
//

#import <MapKit/MapKit.h>
#import <React/RCTViewManager.h>
#import "RCTConvert+Mapkit.h"
#import "ERNMapView.h"

@interface ERNMapManager : RCTViewManager<MKMapViewDelegate>
@end

@implementation ERNMapManager

RCT_EXPORT_MODULE(ERNMap)

- (UIView *)view
{
  ERNMapView *map = [ERNMapView new];
  map.delegate = self;
  return map;
}

RCT_EXPORT_VIEW_PROPERTY(zoomEnabled, BOOL)

RCT_CUSTOM_VIEW_PROPERTY(region, MKCoordinateRegion, MKMapView)
{
  [view setRegion:json ? [RCTConvert MKCoordinateRegion:json] : defaultView.region animated:YES];
}

- (void)mapView:(ERNMapView *)mapView regionDidChangeAnimated:(BOOL)animated
{
  if (!mapView.onRegionChange) {
    return;
  }

  MKCoordinateRegion region = mapView.region;
  mapView.onRegionChange(@{
    @"region": @{
      @"latitude": @(region.center.latitude),
      @"longitude": @(region.center.longitude),
      @"latitudeDelta": @(region.span.latitudeDelta),
      @"longitudeDelta": @(region.span.longitudeDelta),
    }
  });
}

@end
