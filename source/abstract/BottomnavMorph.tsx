import { Skia } from '@shopify/react-native-skia';
import { parse } from 'react-native-redash';

export const states = [
    [
        'M393 94H0V0H4C21.7506 0 11.4612 0.0078125 49.6445 0.0078125C87.5294 0.00775017 78.1954 0.638499 94.8896 0.0078125L95.2891 0H393V94Z',
        'M393 94H0V0H4C21.7506 0 11.4612 41 49.6445 41C87.5294 40.9999 78.1954 0.638499 94.8896 0.0078125L95.2891 0H393V94Z'
    ],
    [
        'M393 94H0V0H75C92.7506 0 82.4612 0 120.645 0C158.529 -6.23227e-05 149.195 0.638499 165.89 0.0078125L166.289 0H393V94Z',
        'M393 94H0V0H75C92.7506 0 82.4612 41 120.645 41C158.529 40.9999 149.195 0.638499 165.89 0.0078125L166.289 0H393V94Z'
    ],
    [
        'M393 94H0V0H146C163.751 0 153.461 0.0078125 191.645 0.0078125C229.529 0.00775018 220.195 0.638499 236.89 0.0078125L237.289 0H393V94Z',
        'M393 94H0V0H146C163.751 0 153.461 41 191.645 41C229.529 40.9999 220.195 0.638499 236.89 0.0078125L237.289 0H393V94Z'
    ],
    [
        'M393 94H0V0H217.289C235.04 0 224.75 0.0078125 262.934 0.0078125C300.819 0.00775018 291.484 0.638499 308.179 0.0078125L308.578 0H393V94Z',
        'M393 94H0V0H217.289C235.04 0 224.75 41 262.934 41C300.819 40.9999 291.484 0.638499 308.179 0.0078125L308.578 0H393V94Z'
    ],
    [
        'M393 94H0V0H288.289C306.04 0 295.75 0.0078125 333.934 0.0078125C371.819 0.00775018 362.484 0.638499 379.179 0.0078125L379.578 0H393V94Z',
        'M393 94H0V0H288.289C306.04 0 295.75 41 333.934 41C371.819 40.9999 362.484 0.638499 379.179 0.0078125L379.578 0H393V94Z'
    ]
].map(e => e.map(ee => Skia.Path.MakeFromSVGString(ee)!));

export const labels = {
    'Profile': 'https://i.imgur.com/A25FxpS.png',
    'Recipe': 'https://i.imgur.com/cHssdnJ.png',
    'Pantry': 'https://i.imgur.com/F5kudVv.png',
    'Planner': 'https://i.imgur.com/GNo90V5.png',
    'Home': 'https://i.imgur.com/wOm3ZDm.png',
};

export const flaticons = {
    'Profile': 'https://i.imgur.com/RYcD1Pi.png',
    'Recipe': 'https://i.imgur.com/L2SBLeS.png',
    'Pantry': 'https://i.imgur.com/RgJO4ze.png',
    'Planner': 'https://i.imgur.com/BnmZJnz.png',
    'Home': 'https://i.imgur.com/fdrICAV.png',
};

export const circleframedicons = {
    'Profile': 'https://i.imgur.com/EW5h9Xj.png',
    'Recipe': 'https://i.imgur.com/AIOoR8n.png',
    'Pantry': 'https://i.imgur.com/92kGoMM.png',
    'Planner': 'https://i.imgur.com/c4e8F64.png',
    'Home': 'https://i.imgur.com/iX7qr8r.png',
};