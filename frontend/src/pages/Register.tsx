import Squares from "../components/Background";
import Button from "../components/Button";
import Send from "../components/Send";
import TrueFocus from "../components/TrueFocus";

export default function Register() {

    return <>
        <div className="relative flex justify-center items-center min-h-screen bg-slate-900 overflow-hidden">
            <div className="absolute inset-0 z-0 text-cyan-400 drop-shadow-[0_0_10px_#0ff]">
                <Squares
                    speed={0.5}
                    squareSize={40}
                    direction="diagonal"
                    borderColor="#0ff"
                    hoverFillColor="#0ff"
                />
            </div>

            <div className="flex items-center justify-center z-10">
                <div className="bg-gray-900 border-[4px] border-blue-900 rounded-2xl hover:border-blue-500 transition-all duration-200">
                    <div className="mx-auto flex items-center flex-col space-y-4 py-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                        <div className="my-10">
                            <TrueFocus
                                sentence="Chat Dash"
                                manualMode={false}
                                blurAmount={3}
                                borderColor="#FF00FF"
                                glowColor="rgba(255, 0, 255, 0.6)"
                                animationDuration={1}
                                pauseBetweenAnimations={0.7}
                            />
                        </div>
                        <div>
                            <Send />
                            <Button />
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </>

}