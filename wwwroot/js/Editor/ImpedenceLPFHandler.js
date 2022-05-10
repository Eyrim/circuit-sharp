fallback.load({
    jQuery: [
        // Google's CDN
        "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
        // Local fallback
        "http://localhost:8001/lib/jquery/dist/jquery.js"
    ]
});
fallback.ready(['jQuery'], (jQuery) => {
    let impedenceData = {
        resistance: undefined,
        reactance: undefined,
        frequency: undefined,
        capacitance: undefined,
        impedance: undefined
    };
    $(document).ready(() => {
        $("#calculateBtn").click(() => {
            var x = $("form").serializeArray();
            $.each(x, function (i, field) {
                impedenceData[field.name] = field.value;
                /*$("#output").append(field.name + ":"
                    + field.value + " " + "<br>");*/
            });
            processData(impedenceData);
            function processData(data) {
                console.log(impedenceData);
                calculateReactance(data.frequency, data.capacitance);
                calculateImpedance(data.resistance, data.reactance);
                displayValues(data.impedance);
            }
            function calculateReactance(freq, cap) {
                let reactance;
                let temp = (2 * Math.PI * freq * cap);
                reactance = 1 / temp;
                console.log(reactance);
                impedenceData.reactance = reactance;
            }
            function calculateImpedance(res, reac) {
                impedenceData.impedance = (res * res) + (reac * reac);
                impedenceData.impedance = Math.sqrt(impedenceData.impedance);
                console.log(impedenceData.impedance);
            }
            function displayValues(imped) {
                $("#impedanceDisplay").text(imped);
            }
        });
    });
});
