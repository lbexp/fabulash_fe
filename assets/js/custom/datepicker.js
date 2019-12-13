"use strict";

var datepickerIndonesia = function () {
    $.fn.datepicker.dates['id'] = {
        days: 'Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu'.split('_'),
        daysShort: 'Min_Sen_Sel_Rab_Kam_Jum_Sab'.split('_'),
        daysMin: 'Mg_Sn_Sl_Rb_Km_Jm_Sb'.split('_'),
        months: 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split('_'),
        monthsShort: 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agt_Sep_Okt_Nov_Des'.split('_'),
        today: "Hari ini",
        clear: "Reset",
        format: "dd MM yyyy",
        titleFormat: "MM yyyy"
    };

    // $('#kt_search_tanggal').datepicker({
    //     todayHighlight: true,
    //     language: 'id',
    //     rtl: KTUtil.isRTL(),
    //     todayBtn: "linked",
    //     clearBtn: true,
    //     templates: {
    //         leftArrow: '<i class="la la-angle-left"></i>',
    //         rightArrow: '<i class="la la-angle-right"></i>',
    //     },
    // });
    //
    // $('.kt_search_tanggal').datepicker({
    //     todayHighlight: true,
    //     language: 'id',
    //     rtl: KTUtil.isRTL(),
    //     todayBtn: "linked",
    //     clearBtn: true,
    //     templates: {
    //         leftArrow: '<i class="la la-angle-left"></i>',
    //         rightArrow: '<i class="la la-angle-right"></i>',
    //     },
    // });
    //
    // $('#kt_search_waktu').datepicker({
    //     todayHighlight: true,
    //     language: 'id',
    //     orientation: "bottom auto",
    //     rtl: KTUtil.isRTL(),
    //     todayBtn: "linked",
    //     clearBtn: true,
    //     templates: {
    //         leftArrow: '<i class="la la-angle-left"></i>',
    //         rightArrow: '<i class="la la-angle-right"></i>',
    //     },
    // });
    //
    // $('#kt_search_waktu_2').datepicker({
    //     todayHighlight: true,
    //     language: 'id',
    //     orientation: "bottom auto",
    //     rtl: KTUtil.isRTL(),
    //     todayBtn: "linked",
    //     clearBtn: true,
    //     templates: {
    //         leftArrow: '<i class="la la-angle-left"></i>',
    //         rightArrow: '<i class="la la-angle-right"></i>',
    //     },
    // });
    //
    // $('#kt_search_month').datepicker({
    //     todayHighlight: true,
    //     language: 'id',
    //     orientation: "bottom auto",
    //     format: "MM yyyy",
    //     viewMode: "months",
    //     minViewMode: "months",
    //     rtl: KTUtil.isRTL(),
    //     templates: {
    //         leftArrow: '<i class="la la-angle-left"></i>',
    //         rightArrow: '<i class="la la-angle-right"></i>',
    //     },
    // }).datepicker("setDate", new Date());
    //
    // $('.kt_multidatepicker').datepicker({
    //     // startDate: new Date(),
    //     multidate: true,
    //     todayHighlight: true,
    //     language: 'id',
    //     clearBtn: true,
    //     daysOfWeekHighlighted: "6,0",
    //     daysOfWeekDisabled: "6,0",
    //     templates: {
    //         leftArrow: '<i class="la la-angle-left"></i>',
    //         rightArrow: '<i class="la la-angle-right"></i>',
    //     },
    // });

    $('.kt-datepicker').datepicker({
        todayHighlight: true,
        language: 'id',
        rtl: KTUtil.isRTL(),
        todayBtn: "linked",
        clearBtn: true,
        templates: {
            leftArrow: '<i class="la la-angle-left"></i>',
            rightArrow: '<i class="la la-angle-right"></i>',
        },
    });

    $('#kt-monthpicker').datepicker({
        todayHighlight: true,
        language: 'id',
        orientation: "bottom auto",
        format: "MM yyyy",
        viewMode: "months",
        minViewMode: "months",
        rtl: KTUtil.isRTL(),
        templates: {
            leftArrow: '<i class="la la-angle-left"></i>',
            rightArrow: '<i class="la la-angle-right"></i>',
        },
    }).datepicker("setDate", new Date());

    $('.kt-multidatepicker').datepicker({
        // startDate: new Date(),
        multidate: true,
        todayHighlight: true,
        language: 'id',
        clearBtn: true,
        daysOfWeekHighlighted: "6,0",
        daysOfWeekDisabled: "6,0",
        templates: {
            leftArrow: '<i class="la la-angle-left"></i>',
            rightArrow: '<i class="la la-angle-right"></i>',
        },
    });

}();

var timepicker = function () {
    $('#kt_timepicker_2, #kt_timepicker_2_modal').timepicker({
        minuteStep: 15,
        defaultTime: '',
        showSeconds: false,
        showMeridian: false,
        snapToStep: true
    });
}();

jQuery.ready(function() {
    datepickerIndonesia.init();
    timepicker.init();
});
