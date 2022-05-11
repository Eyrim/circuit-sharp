fallback.load({
    jQuery: [
        // Google's CDN
        "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
        // Local fallback
        "http://localhost:8001/lib/jquery/dist/jquery.js"
    ]
});

fallback.ready(['jQuery'], (jQuery): void => {
    let ohmsData = {
        voltage: undefined,
        current: undefined,
        resistance: undefined,
        length: function() {
            let counter = 0;
            if (this.Voltage != "") {
                counter += 1;
            } if (this.Current != "") {
                counter += 1;
            } if (this.Resistance != "") {
                counter += 1;
            }

            return counter;
        }
    }

    // Listen for a click to the submit button
    //https://www.geeksforgeeks.org/how-to-get-form-data-using-javascript-jquery/
    $(document).ready((): void => {
        $("#calculateBtn").click((): void => {
            var x = $("form").serializeArray();
            $.each(x, function (i, field): void {
                ohmsData[field.name] = field.value;
                /*$("#output").append(field.name + ":"
                    + field.value + " " + "<br>");*/
            });

            processData(ohmsData);

            function processData(data: any): void {
                if (data.voltage != "" && data.current != "") {
                    ohmsData.resistance = calculateResistance(data.voltage, data.current);
                } else if (data.current != "" && data.resistance != "") {
                    ohmsData.voltage = calculateVoltage(data.current, data.resistance);
                } else if (data.voltage != "" && data.resistance != "") {
                    ohmsData.current = calculateCurrent(data.voltage, data.resistance);
                }

                displayValues(ohmsData.resistance, ohmsData.voltage, ohmsData.current);
            }

            // Need to display all of  the values
            function calculateResistance(voltage: number, current: number): number {
                return voltage / current;
            }

            function calculateVoltage(current: number, resistance: number): number {
                return current * resistance;
            }

            function calculateCurrent(voltage: number, resistance: number): number {
                return voltage / resistance;
            }

            function displayValues(r: number, v: number, c: number): void {
                $("#resistanceDisplay").text(r);
                $("#voltageDisplay").text(v);
                $("#currentDisplay").text(c);
            }
        });

        $("#gotoEditor").click((): void => {
            window.location.replace(`http://localhost:8001/Editor/EditorPage`);
        });
    });
});