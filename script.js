/* =====================================
   CAMPAIGN CONFIGURATION
===================================== */

const campaign = {

    collected: 0,

    target: 100000000,

    donors: 0

};


/*
    NANTI SAAT QRIS / PAYMENT GATEWAY SIAP,
    KITA TIDAK PERLU MENGUBAH DESAIN.

    Cukup hubungkan sistem pembayaran
    pada fungsi processDonation().
*/


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

    const percentage =
        Math.min(
            (
                campaign.collected /
                campaign.target
            ) * 100,
            100
        );


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

function openDonation() {

    const modal =
        document.getElementById(
            "donationModal"
        );


    modal.classList.add("active");


    document.body.style.overflow =
        "hidden";

}


function closeDonation() {

    const modal =
        document.getElementById(
            "donationModal"
        );


    modal.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}


/* =====================================
   SELECT NOMINAL
===================================== */

let selectedDonation = 100000;


function selectAmount(amount) {

    selectedDonation = amount;


    const selected =
        document.getElementById(
            "selectedAmount"
        );


    selected.textContent =
        formatRupiah(
            amount
        );


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


    /*
        event.currentTarget digunakan
        agar tombol yang dipilih tepat.
    */

    if (event && event.currentTarget) {

        event.currentTarget.classList.add(
            "selected"
        );

    }

}


/* =====================================
   PROCESS DONATION
===================================== */

function processDonation() {

    /*
        SEKARANG:

        QRIS belum terhubung.

        NANTI:

        Fungsi ini akan diarahkan
        ke sistem pembayaran resmi.
    */


    alert(

        "Nominal " +

        formatRupiah(
            selectedDonation
        ) +

        " dipilih.\n\n" +

        "Pembayaran QRIS akan tersedia " +

        "setelah sistem pembayaran campaign " +

        "selesai dihubungkan."

    );

}


/* =====================================
   SHARE
===================================== */

function shareCampaign() {

    const shareData = {

        title:
            "Bantu Kalimantan",

        text:
            "Mari bersama membantu " +
            "masyarakat terdampak " +
            "karhutla di Kalimantan.",

        url:
            window.location.href

    };


    if (
        navigator.share &&
        window.isSecureContext
    ) {

        navigator.share(
            shareData
        )

        .catch(
            function() {}
        );

    } else {

        const whatsapp =
            "https://wa.me/?text=" +

            encodeURIComponent(

                shareData.text +

                "\n\n" +

                shareData.url

            );


        window.open(
            whatsapp,
            "_blank"
        );

    }

}


/* =====================================
   ESCAPE KEY
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
   START
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCampaign();

    }
);