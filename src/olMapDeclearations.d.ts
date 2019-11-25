import { Components } from '@xingheng/stencil-openlayers/dist/types';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'ol-map': any,
            'ol-tile-layer': any,
            'ol-vector-layer': any,
            'ol-vector-layer-feature': any,
            'ol-overlay': any,
            'ol-base-layer': any,
            'ol-control-zoom': any,
            'ol-control-center': any,
            'ol-control-fullscreen': any,
            'ol-control-baseswitch': any,
            'ol-control-mouse-position': any,
            'ol-control-scaleline': any
        }
    }
    interface Window {
        print: any
    }
}