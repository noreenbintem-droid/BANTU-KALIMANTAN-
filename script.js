/* =====================================
   BANTU KALIMANTAN
   SCRIPT FINAL
===================================== */


/* =====================================
   DATA CAMPAIGN
===================================== */

const campaign = {

    target: 100000000,

    collected: 0,

    donors: 0

};



/* =====================================
   FORMAT RUPIAH
===================================== */

function formatRupiah(number) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }
    ).format(number);

}



/* =====================================
   UPDATE CAMPAIGN
===================================== */

function updateCampaign() {

    const amount =
        document.getElementById(
            "donationAmount"
        );

    const donors =
        document.getElementById(
            "donorCount"
        );

    const progress =
        document.getElementById(
            "progressBar"
        );

    const percent =
        document.getElementById(
            "progressPercent"
        );

    const statDonors =
        document.getElementById(
            "statDonors"
        );

    const statPercent =
        document.getElementById(
            "statPercent"
        );


    let percentage =
        (campaign.collected /
        campaign.target) * 100;


    percentage =
        Math.min(
            percentage,
            100
        );


    if (amount) {

        amount.textContent =
            formatRupiah(
                campaign.collected
            );

    }


    if (donors) {

        donors.textContent =
            campaign.donors;

    }


    if (progress) {

        progress.style.width =
            percentage + "%";

    }


    if (percent) {

        percent.textContent =
            Math.round(
                percentage
            ) + "%";

    }


    if (statDonors) {

        statDonors.textContent =
            campaign.donors;

    }


    if (statPercent) {

        statPercent.textContent =
            Math.round(
                percentage
            ) + "%";

    }

}



/* =====================================
   DONATION MODAL
===================================== */

const modal =
    document.getElementById(
        "donationModal"
    );


let selectedAmount =
    100000;



function openDonation() {

    if (!modal) return;

    modal.classList.add(
        "active"
    );

    document.body.classList.add(
        "modal-open"
    );

}



function closeDonation() {

    if (!modal) return;

    modal.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "modal-open"
    );

}



/* =====================================
   SELECT NOMINAL
===================================== */

function selectAmount(amount) {

    selectedAmount =
        amount;


    const display =
        document.getElementById(
            "selectedAmount"
        );


    if (display) {

        display.textContent =
            formatRupiah(
                amount
            );

    }


    const buttons =
        document.querySelectorAll(
            ".nominal-grid button"
        );


    buttons.forEach(
        function(button) {

            button.classList.remove(
                "selected"
            );

        }
    );


    const clicked =
        Array.from(buttons)
        .find(
            function(button) {

                return button
                    .textContent
                    .includes(
                        formatShortRupiah(
                            amount
                        )
                    );

            }
        );


    if (clicked) {

        clicked.classList.add(
            "selected"
        );

    }

}



/* =====================================
   SHORT RUPIAH
===================================== */

function formatShortRupiah(amount) {

    if (amount >= 1000000) {

        return "Rp1JT";

    }

    if (amount >= 1000) {

        return "Rp" +
            (amount / 1000) +
            "K";

    }

    return "Rp" + amount;

}



/* =====================================
   PROCESS DONATION
===================================== */

function processDonation() {

    alert(
        "Nominal " +
        formatRupiah(selectedAmount) +
        " dipilih.\n\n" +
        "QRIS/metode pembayaran akan " +
        "dihubungkan setelah sistem " +
        "pembayaran campaign siap."
    );

}



/* =====================================
   SHARE CAMPAIGN
===================================== */

function shareCampaign() {

    const shareData = {

        title:
            "Bantu Kalimantan",

        text:
            "Mari bersama mendukung Kalimantan " +
            "dan masyarakat yang terdampak karhutla.",

        url:
            window.location.href

    };


    if (
        navigator.share
    ) {

        navigator.share(
            shareData
        )
        .catch(
            function() {}
        );

    } else {

        copyCampaignLink();

    }

}



/* =====================================
   COPY LINK
===================================== */

function copyCampaignLink() {

    const url =
        window.location.href;


    if (
        navigator.clipboard
    ) {

        navigator.clipboard
            .writeText(url)
            .then(
                function() {

                    alert(
                        "Link campaign berhasil disalin."
                    );

                }
            )
            .catch(
                function() {

                    fallbackCopy(url);

                }
            );

    } else {

        fallbackCopy(url);

    }

}



/* =====================================
   FALLBACK COPY
===================================== */

function fallbackCopy(text) {

    const input =
        document.createElement(
            "input"
        );


    input.value =
        text;


    document.body.appendChild(
        input
    );


    input.select();


    document.execCommand(
        "copy"
    );


    document.body.removeChild(
        input
    );


    alert(
        "Link campaign berhasil disalin."
    );

}



/* =====================================
   ESCAPE CLOSE MODAL
===================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeDonation();

        }

    }
);



/* =====================================
   INITIALIZE
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCampaign();

    }
);