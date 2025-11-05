import { GridScan } from "./GridScan";

export default function Loader() {

    return <div className="fixed inset-0 w-screen h-screen">
        <GridScan
            sensitivity={0.55}
            lineThickness={1}
            linesColor="#392e4e"
            gridScale={0.1}
            scanColor="#00FFFF"
            scanOpacity={0.4}
            enablePost
            bloomIntensity={0.6}
            chromaticAberration={0.002}
            noiseIntensity={0.01}
            enableGyro
            enableWebcam
        />
    </div>
}