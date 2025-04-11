Web Audio: Reverb with `ConvolverNode`
======================================

Mic On Mic Off

The `ConvolverNode` in the Web Audio API applies a linear convolution effect to audio. This is often used to simulate reverberation based on an **impulse response** (IR), which captures the acoustic signature of a physical space.

What is Linear Convolution?
---------------------------

Linear convolution is a process that combines two signals—typically an input signal and an impulse response—to produce a new signal. In audio, this means shaping an input sound based on how it would behave in a real-world environment (like a concert hall or chapel).

Loading an Impulse Response
---------------------------

To use a `ConvolverNode`, you need to load an audio file that contains the impulse response and decode it into an `AudioBuffer`. This buffer is then assigned to the `buffer` property of the convolver. Here's how that works:

Reverb with a Convolver Node
----------------------------

    const createReverb = async function() {
        let convolver = audioContext.createConvolver();
    
        // Load impulse response
        let response = await fetch("ir/TPAC-chapel.wav");
        let arraybuffer = await response.arrayBuffer();
        convolver.buffer = await audioContext.decodeAudioData(arraybuffer);
    
        return convolver;
    }
    
    // Usage
    reverb = await createReverb();
    reverb.connect(outputGain);


This example loads an impulse response from `TPAC-chapel.wav` and sets it as the buffer for a `ConvolverNode`. Once created, the reverb is connected to the audio graph through `outputGain`.