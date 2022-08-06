let audioContext = new AudioContext();
document.body.addEventListener("keydown", (e) => {
    // console.log(e.key);
    if (
        e.target.tagName == "INPUT" &&
        e.key === "Enter" &&
        !document.getElementById("start").disabled
    )
        animate(document.getElementById("number").value);
});
// function which is called when we click the button
function laserate(a) {
    // create an oscillator node
    let osc = audioContext.createOscillator();
    // set type - can be sine, square, sawtooth, triangle
    osc.type = "triangle";
    // set frequency
    osc.frequency.value = a ? 192 * 5 : 5 * 150;
    // up frequency over a second
    osc.frequency.exponentialRampToValueAtTime(
        600,
        audioContext.currentTime + 1
    );

    // create gain node
    let gain = audioContext.createGain();

    // gain by default is 1 - drop it to near mute after about a second
    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.9
    );

    // start oscillator
    osc.start();
    // stop it after a second
    osc.stop(audioContext.currentTime + 1);
    // connect our graph
    osc.connect(gain).connect(audioContext.destination);
}

let s = document.getElementById("start");
s.addEventListener("click", () =>
    animate(document.getElementById("number").value)
);
function animate(l) {
    s.disabled = true;
    let i = 0;
    document.querySelector(`[data-val="${l % 6}"]`).classList.toggle("active");
    document.getElementById("output").innerText = `${l},${l % 6}`;
    while (l != 1) {
        p = l;
        l = c(p);
        console.log(l);
        setTimeout(glow, 1000 + i * 250, p, l);
        i++;
    }
    setTimeout(
        (s) => {
            document
                .querySelector(`[data-val="${l % 6}"]`)
                .classList.toggle("active");
            s.disabled = false;
        },
        1000 + i * 250,
        s
    );
}
function c(x) {
    return x % 2 ? 3 * x + 1 : Number.parseInt(x / 2);
}
function glow(a, b) {
    document.querySelector(`[data-val="${a % 6}"]`).classList.toggle("active");
    document.querySelector(`[data-val="${b % 6}"]`).classList.toggle("active");
    // console.log(a, b);
    document.getElementById("output").innerText = `${b.toString(2)},${b % 6}`;
    if (document.getElementById("audio").checked) {
        laserate(b % 2);
    }
}
