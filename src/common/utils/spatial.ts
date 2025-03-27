export function createPoint({ longitude, latitude }: { longitude: number; latitude: number; }) {
    return {
        type: 'Point',
        coordinates: [longitude, latitude] // MySQL usa longitude primeiro
    };
}

export function formatPointForResponse(point: any) {
    if (!point) return null;
    return point;
}

