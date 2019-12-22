"use strict";

// begin: Admin Page
var KTDatatablesSearchOptionsAdvancedSearch = function() {

    $.fn.dataTable.Api.register('column().title()', function() {
        return $(this.header()).text().trim();
    });

    var initTableActiveTreatment = function() {
        // begin first table
        var table = $('#table_treatment_active').DataTable({
            order: [],
            responsive: true,
            // Pagination settings
            dom: `<'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
            // read more: https://datatables.net/examples/basic_init/dom.html
            lengthMenu: [5, 10, 25, 50],
            pageLength: 10,
            language: {
                'lengthMenu': 'Display _MENU_',
            },
            searchDelay: 500,
            processing: true,
            serverSide: false,
            ajax: {
                url: 'source/therapist/treatment.json',
                type: 'POST',
                data: {
                    // parameters for custom backend script demo
                    columnsDef: [
                        'no', 'depot', 'vendor', 'pekerjaan', 'sifat',
                        'tanggal', 'status', 'aksi',
                    ],
                },
            },
            columns: [{
                data: 'null',
                title: 'No',
                render: function(data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                width: 35,
                orderable: false,
            }, {
                data: 'tanggal',
                title: 'Tanggal',
            }, {
                data: 'customer',
                title: 'Customer',
            }, {
                data: 'status',
                title: 'Status',
                // width: 70,
                render: function(data, type, full, meta) {
                    var status = {
                        scheduled: {
                            'title': 'Scheduled',
                            'class': 'btn-label-dark'
                        },
                        ongoing: {
                            'title': 'Ongoing',
                            'class': 'btn-label-primary'
                        },
                        waiting: {
                            'title': 'Waiting',
                            'class': 'btn-label-warning'
                        },
                        done: {
                            'title': 'Done',
                            'class': 'btn-label-success'
                        },
                    };
                    if (typeof status[data] === 'undefined') {
                        return data;
                    }
                    return '<span style="width:100%" class="btn btn-bold btn-sm btn-font-sm ' + status[data].class + '">' + status[data].title + '</span>';
                },
            },{
                field: 'aksi',
                title: 'Aksi',
                responsivePriority: -1,
                className: 'text-center',
                orderable: false,
                width: 100,
                render: function(data, type, full, meta) {
                    var status = {
                        scheduled: {'href': 'treatment_detail_scheduled.html'},
                        ongoing : {'href': 'treatment_detail_ongoing.html'},
                        waiting: {'href': 'treatment_detail_waiting.html'},
                        done : {'href': 'treatment_detail_done.html'},
                    };
                    return `
                    <a href="user_therapist/${status[full.status].href}" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
                },
            }],
            columnDefs: [{
                targets: [0, 1, 2, 3, 4],
                className: 'text-center',
                orderable: true,
            }],
        });

        table.on('order.dt search.dt', function() {
            table.column(0, {
                search: 'applied',
                order: 'applied'
            }).nodes().each(function(cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();

        $('#datepicker_treatment_active').on('change', function(e) {
            e.preventDefault();
            var params = {};
            var i = $(this).data('col-index');
            if (params[i]) {
                params[i] += '|' + $(this).val();
            } else {
                params[i] = $(this).val();
            }
            $.each(params, function(i, val) {
                // apply search params to datatable
                table.column(i).search(val ? val : '', false, false);
            });
            table.table().draw();
        });

        $('#search_treatment_active').on('keyup', function() {
            table.search(this.value).draw();
        });

        $('#datepicker_treatment_active').datepicker({
            todayHighlight: true,
            language: 'id',
            rtl: KTUtil.isRTL(),
            todayBtn: "linked",
            clearBtn: true,
            templates: {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>',
            },
        }).datepicker("setDate", new Date());
    };

    var initTableListTreatment = function() {
        // begin first table
        var table = $('#table_treatment_list').DataTable({
            order: [],
            responsive: true,
            // Pagination settings
            dom: `<'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
            // read more: https://datatables.net/examples/basic_init/dom.html
            lengthMenu: [5, 10, 25, 50],
            pageLength: 10,
            language: {
                'lengthMenu': 'Display _MENU_',
            },
            searchDelay: 500,
            processing: true,
            serverSide: false,
            ajax: {
                url: 'source/therapist/treatment.json',
                type: 'POST',
                data: {
                    // parameters for custom backend script demo
                    columnsDef: [
                        'no', 'depot', 'vendor', 'pekerjaan', 'sifat',
                        'tanggal', 'status', 'aksi',
                    ],
                },
            },
            columns: [{
                data: 'null',
                title: 'No',
                render: function(data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                width: 35,
                orderable: false,
            }, {
                data: 'tanggal',
                title: 'Tanggal',
            }, {
                data: 'no_pesanan',
                title: 'No. Pesanan',
            }, {
                data: 'treatment',
                title: 'Treatment',
            }, {
                data: 'customer',
                title: 'Customer',
            }, {
                data: 'komisi',
                title: 'Komisi'
            }, {
                data: 'durasi',
                title: 'Durasi',
            }, {
                field: 'aksi',
                title: 'Aksi',
                responsivePriority: -1,
                className: 'text-center',
                orderable: false,
                width: 100,
                render: function(data, type, full, meta) {
                    return `
                    <a href="user_therapist/treatment_detail_done.html" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
                },
            }],
            columnDefs: [{
                targets: [0, 1, 2, 3, 4, 5, 6, 7],
                className: 'text-center',
                orderable: true,
            }],
        });

        table.on('order.dt search.dt', function() {
            table.column(0, {
                search: 'applied',
                order: 'applied'
            }).nodes().each(function(cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();

        $('#datepicker_treatment_list').on('change', function(e) {
            e.preventDefault();
            var params = {};
            var i = $(this).data('col-index');
            if (params[i]) {
                params[i] += '|' + $(this).val();
            } else {
                params[i] = $(this).val();
            }
            $.each(params, function(i, val) {
                // apply search params to datatable
                table.column(i).search(val ? val : '', false, false);
            });
            table.table().draw();
        });

        $('#search_treatment_list').on('keyup', function() {
            table.search(this.value).draw();
        });

        $('#datepicker_treatment_list').datepicker({
            todayHighlight: true,
            language: 'id',
            rtl: KTUtil.isRTL(),
            todayBtn: "linked",
            clearBtn: true,
            templates: {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>',
            },
        }).datepicker("setDate", new Date());
    };

    var initTableComplaint = function() {
        // begin first table
        var table = $('#table_complaint').DataTable({
            order: [],
            responsive: true,
            // Pagination settings
            dom: `<'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
            // read more: https://datatables.net/examples/basic_init/dom.html
            lengthMenu: [5, 10, 25, 50],
            pageLength: 10,
            language: {
                'lengthMenu': 'Display _MENU_',
            },
            searchDelay: 500,
            processing: true,
            serverSide: false,
            ajax: {
                url: 'source/therapist/treatment.json',
                type: 'POST',
                data: {
                    // parameters for custom backend script demo
                    columnsDef: [
                        'no', 'depot', 'vendor', 'pekerjaan', 'sifat',
                        'tanggal', 'status', 'aksi',
                    ],
                },
            },
            columns: [{
                data: 'null',
                title: 'No',
                render: function(data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                width: 35,
                orderable: false,
            }, {
                data: 'tanggal',
                title: 'Tanggal',
            }, {
                data: 'no_pesanan',
                title: 'No. Pesanan',
            }, {
                data: 'treatment',
                title: 'Treatment',
            }, {
                data: 'customer',
                title: 'Customer',
            }, {
                data: 'complaint',
                title: 'Complaint',
            },{
                field: 'aksi',
                title: 'Aksi',
                responsivePriority: -1,
                className: 'text-center',
                orderable: false,
                width: 100,
                render: function(data, type, full, meta) {
                    return `
                    <a href="user_therapist/profile_complaint_detail.html" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
                },
            }],
            columnDefs: [{
                targets: [0, 1, 2, 3, 4, 5, 6],
                className: 'text-center',
                orderable: true,
            }],
        });

        table.on('order.dt search.dt', function() {
            table.column(0, {
                search: 'applied',
                order: 'applied'
            }).nodes().each(function(cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();

        $('#monthpicker_complaint').on('change', function(e) {
            e.preventDefault();
            var params = {};
            var i = $(this).data('col-index');
            if (params[i]) {
                params[i] += '|' + $(this).val();
            } else {
                params[i] = $(this).val();
            }
            $.each(params, function(i, val) {
                // apply search params to datatable
                table.column(i).search(val ? val : '', false, false);
            });
            table.table().draw();
        });

        $('#search_complaint').on('keyup', function() {
            table.search(this.value).draw();
        });

        $('#monthpicker_complaint').datepicker({
            todayHighlight: true,
            language: 'id',
            orientation: "bottom auto",
            format: "MM yyyy",
            viewMode: "months",
            minViewMode: "months",
            rtl: KTUtil.isRTL(),
            clearBtn: true,
            templates: {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>',
            },
        }).datepicker("setDate", new Date());
    };

    var initTableTreatmentDetail = function() {
        var table = $('#table_treatment_detail');
        // begin first table
        table.DataTable({
            order: [],
            info: false,
            paging: false,
            lengthChange: false,
            searching: false,
            responsive: true,
            ajax: {
                url: 'source/therapist/invoice.json',
                type: 'POST',
                data: {
                    pagination: {
                        perpage: 50,
                    },
                },
            },
            columns: [{
                data: 'null',
                title: 'No',
                render: function(data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                width: 35,
                orderable: false,
            }, {
                data: 'treatment',
                title: 'Treatment'
            }, {
                data: 'harga',
                title: 'Harga'
            }, ],
            columnDefs: [{
                targets: [0, 1, 2],
                className: 'text-center',
                orderable: false,
            }],
        });
    };

    var initTableStock = function() {
        var table = $('#table_inventory_stock');
        // begin first table
        var datatable = table.DataTable({
            order: [],
            responsive: true,
            ajax: {
                url: 'source/therapist/stock.json',
                type: 'POST',
                data: {
                    pagination: {
                        perpage: 50,
                    },
                },
            },
            columns: [{
                data: 'null',
                title: 'No',
                render: function(data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                width: 35,
                orderable: false,
            }, {
                data: 'barang',
                title: 'Barang'
            }, {
                data: 'jumlah',
                title: 'Jumlah'
            }, {
                data: 'satuan',
                title: 'Satuan'
            }, ],
            columnDefs: [{
                targets: [0, 1, 2, 3],
                className: 'text-center',
                orderable: true,
            }],
        });

        datatable.on('order.dt search.dt', function() {
            datatable.column(0, {
                search: 'applied',
                order: 'applied'
            }).nodes().each(function(cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();
    };

    var initTableRequestInventory = function() {
        // begin first table
        var table = $('#table_inventory_request').DataTable({
            order: [],
            responsive: true,
            // Pagination settings
            dom: `<'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
            // read more: https://datatables.net/examples/basic_init/dom.html
            lengthMenu: [5, 10, 25, 50],
            pageLength: 10,
            language: {
                'lengthMenu': 'Display _MENU_',
            },
            searchDelay: 500,
            processing: true,
            serverSide: false,
            ajax: {
                url: 'source/therapist/request.json',
                type: 'POST',
                data: {
                    // parameters for custom backend script demo
                    columnsDef: [
                        'no', 'depot', 'vendor', 'pekerjaan', 'sifat',
                        'tanggal', 'status', 'aksi',
                    ],
                },
            },
            columns: [{
                data: 'null',
                title: 'No',
                render: function(data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                width: 35,
                orderable: false,
            }, {
                data: 'tanggal',
                title: 'Tanggal',
            }, {
                data: 'kode_spk',
                title: 'SPK Inventory',
            }, {
                data: 'barang',
                title: 'Barang',
            }, {
                data: 'jumlah',
                title: 'Jumlah',
            }, {
                data: 'satuan',
                title: 'Satuan',
            }, {
                data: 'status',
                title: 'Status',
                // width: 70,
                render: function(data, type, full, meta) {
                    var status = {
                        Request: {
                            'title': 'Request',
                            'class': 'btn-label-warning'
                        },
                        Disetujui: {
                            'title': 'Disetujui',
                            'class': 'btn-label-success'
                        },
                    };
                    if (typeof status[data] === 'undefined') {
                        return data;
                    }
                    return '<span style="width:100%" class="btn btn-bold btn-sm btn-font-sm ' + status[data].class + '">' + status[data].title + '</span>';
                },
            },{
                field: 'aksi',
                title: 'Aksi',
                responsivePriority: -1,
                className: 'text-center',
                orderable: false,
                width: 100,
                render: function(data, type, full, meta) {
                    var status = {
                        Request: {'href': 'inventory_request_detail_request.html'},
                        Disetujui: {'href': 'inventory_request_detail_disetujui.html'}
                    };
                    return `
                    <a href="user_therapist/${status[full.status].href}" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
                },
            }],
            columnDefs: [{
                targets: [0, 1, 2, 3, 4, 5, 6],
                className: 'text-center',
                orderable: true,
            }],
        });

        table.on('order.dt search.dt', function() {
            table.column(0, {
                search: 'applied',
                order: 'applied'
            }).nodes().each(function(cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();

        $('#monthpicker_inventory_request').on('change', function(e) {
            e.preventDefault();
            var params = {};
            var i = $(this).data('col-index');
            if (params[i]) {
                params[i] += '|' + $(this).val();
            } else {
                params[i] = $(this).val();
            }
            $.each(params, function(i, val) {
                // apply search params to datatable
                table.column(i).search(val ? val : '', false, false);
            });
            table.table().draw();
        });

        $('#search_inventory_request').on('keyup', function() {
            table.search(this.value).draw();
        });

        $('#monthpicker_inventory_request').datepicker({
            todayHighlight: true,
            language: 'id',
            orientation: "bottom auto",
            format: "MM yyyy",
            viewMode: "months",
            minViewMode: "months",
            rtl: KTUtil.isRTL(),
            clearBtn: true,
            templates: {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>',
            },
        }).datepicker("setDate", new Date());
    };

    var initTablePemakaianInventory = function() {
        // begin first table
        var table = $('#table_inventory_pemakaian').DataTable({
            order: [],
            responsive: true,
            // Pagination settings
            dom: `<'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
            // read more: https://datatables.net/examples/basic_init/dom.html
            lengthMenu: [5, 10, 25, 50],
            pageLength: 10,
            language: {
                'lengthMenu': 'Display _MENU_',
            },
            searchDelay: 500,
            processing: true,
            serverSide: false,
            ajax: {
                url: 'source/therapist/pemakaian.json',
                type: 'POST',
                data: {
                    // parameters for custom backend script demo
                    columnsDef: [
                        'no', 'depot', 'vendor', 'pekerjaan', 'sifat',
                        'tanggal', 'status', 'aksi',
                    ],
                },
            },
            columns: [{
                data: 'null',
                title: 'No',
                render: function(data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                width: 35,
                orderable: false,
            }, {
                data: 'tanggal',
                title: 'Tanggal',
            }, {
                data: 'kode_spk',
                title: 'SPK Inventory',
            }, {
                data: 'treatment',
                title: 'Treatment',
            }, {
                data: 'barang',
                title: 'Barang',
            }, {
                data: 'jumlah',
                title: 'Jumlah',
            }, {
                data: 'satuan',
                title: 'Satuan',
            }],
            columnDefs: [{
                targets: [0, 1, 2, 3, 4, 5, 6],
                className: 'text-center',
                orderable: true,
            }],
        });

        table.on('order.dt search.dt', function() {
            table.column(0, {
                search: 'applied',
                order: 'applied'
            }).nodes().each(function(cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();

        $('#monthpicker_inventory_pemakaian').on('change', function(e) {
            e.preventDefault();
            var params = {};
            var i = $(this).data('col-index');
            if (params[i]) {
                params[i] += '|' + $(this).val();
            } else {
                params[i] = $(this).val();
            }
            $.each(params, function(i, val) {
                // apply search params to datatable
                table.column(i).search(val ? val : '', false, false);
            });
            table.table().draw();
        });

        $('#search_inventory_pemakaian').on('keyup', function() {
            table.search(this.value).draw();
        });

        $('#monthpicker_inventory_pemakaian').datepicker({
            todayHighlight: true,
            language: 'id',
            orientation: "bottom auto",
            format: "MM yyyy",
            viewMode: "months",
            minViewMode: "months",
            rtl: KTUtil.isRTL(),
            clearBtn: true,
            templates: {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>',
            },
        }).datepicker("setDate", new Date());
    };

    var initTableKehadiran = function () {
        // begin first table
        var table = $('#table_kehadiran').DataTable({
            order: [],
            responsive: true,
            // Pagination settings
            dom: `<'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
            // read more: https://datatables.net/examples/basic_init/dom.html
            lengthMenu: [5, 10, 25, 50],
            pageLength: 10,
            language: {
                'lengthMenu': 'Display _MENU_',
            },
            searchDelay: 500,
            processing: true,
            serverSide: false,
            ajax: {
                url: 'source/therapist/kehadiran.json',
                type: 'POST',
                data: {
                    // parameters for custom backend script demo
                    columnsDef: [
                        'no', 'depot', 'vendor', 'pekerjaan', 'sifat',
                        'tanggal', 'status', 'aksi',
                    ],
                },
            },
            columns: [{
                data: 'null',
                title: 'No',
                render: function(data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                width: 35,
                orderable: false,
            }, {
                data: 'tanggal',
                title: 'Tanggal',
            }, {
                data: 'status',
                title: 'Status',
                render: function (data, type, row, meta) {
                    var status = {
                        masuk: {
                            'title': 'Masuk',
                            'class': 'btn-label-success'
                        },
                        izin: {
                            'title': 'Izin',
                            'class': 'btn-label-warning'
                        },
                        cuti: {
                            'title': 'Cuti',
                            'class': 'btn-label-warning'
                        },
                        sakit: {
                            'title': 'Sakit',
                            'class': 'btn-label-warning'
                        },
                        "lain-lain": {
                            'title': 'Lain-lain',
                            'class': 'btn-label-danger'
                        },
                    };
                    if (typeof status[data] === 'undefined') {
                        return data;
                    }
                    return '<span style="width:100%" class="btn btn-bold btn-sm btn-font-sm ' + status[data].class + '">' + status[data].title + '</span>';
                }
            }, {
                data: 'waktu_masuk',
                title: 'Waktu Masuk'
            }, {
                data: 'waktu_pulang',
                title: 'Waktu pulang'
            }, {
                data: 'keterlambatan',
                title: 'Keterlambatan'
            }],
            columnDefs: [{
                targets: [0, 1, 2, 3, 4, 5],
                className: 'text-center',
                orderable: true,
            }],
        });

        table.on('order.dt search.dt', function() {
            table.column(0, {
                search: 'applied',
                order: 'applied'
            }).nodes().each(function(cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();

        $('#monthpicker_kehadiran').on('change', function(e) {
            e.preventDefault();
            var params = {};
            var i = $(this).data('col-index');
            if (params[i]) {
                params[i] += '|' + $(this).val();
            } else {
                params[i] = $(this).val();
            }
            $.each(params, function(i, val) {
                // apply search params to datatable
                table.column(i).search(val ? val : '', false, false);
            });
            table.table().draw();
        });

        $('#search_kehadiran').on('keyup', function() {
            table.search(this.value).draw();
        });

        $('#monthpicker_kehadiran').datepicker({
            todayHighlight: true,
            language: 'id',
            orientation: "bottom auto",
            format: "MM yyyy",
            viewMode: "months",
            minViewMode: "months",
            rtl: KTUtil.isRTL(),
            clearBtn: true,
            templates: {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>',
            },
        }).datepicker("setDate", new Date());
    };

    var initTableSPKComplaint = function () {
        var table = $('#table_spk_complaint');
        // begin first table
        table.DataTable({
            order: [],
            info: false,
            paging: false,
            lengthChange: false,
            searching: false,
            responsive: true,
            ajax: {
                url: 'source/therapist/spk.json',
                type: 'POST',
                data: {
                    pagination: {
                        perpage: 50,
                    },
                },
            },
            columns: [{
                data: 'null',
                title: 'No',
                render: function(data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                width: 35,
                orderable: false,
            }, {
                data: 'kategori',
                title: 'Kategori'
            }, {
                data: 'therapist',
                title: 'Therapist'
            }, {
                data: 'inventory',
                title: 'Inventory'
            }, {
                data: 'complaint',
                title: 'Complaint'
            }, {
                data: 'durasi',
                title: 'Durasi'
            }, ],
            columnDefs: [{
                targets: [0, 1, 2, 3, 4, 5],
                className: 'text-center',
                orderable: false,
            }],
        });
    };

    var initTableRequestDayOff = function () {
        var table = $('#table_kehadiran_request_dayoff');
        // begin first table
        var datatable = table.DataTable({
            order: [],
            responsive: true,
            ajax: {
                url: 'source/therapist/request_dayoff.json',
                type: 'POST',
                data: {
                    pagination: {
                        perpage: 50,
                    },
                },
            },
            columns: [{
                data: 'null',
                title: 'No',
                render: function(data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                width: 35,
                orderable: false,
            }, {
                data: 'tanggal_request',
                title: 'Tanggal Request'
            }, {
                data: 'tipe',
                title: 'Tipe',
                render: function (data, type, row, meta) {
                    var tipe = {
                        masuk: {
                            'title': 'Masuk',
                            'class': 'btn-label-success'
                        },
                        izin: {
                            'title': 'Izin',
                            'class': 'btn-label-warning'
                        },
                        cuti: {
                            'title': 'Cuti',
                            'class': 'btn-label-warning'
                        },
                        sakit: {
                            'title': 'Sakit',
                            'class': 'btn-label-warning'
                        },
                        "lain-lain": {
                            'title': 'Lain-lain',
                            'class': 'btn-label-danger'
                        },
                    };
                    if (typeof tipe[data] === 'undefined') {
                        return data;
                    }
                    return '<span style="width:100%" class="btn btn-bold btn-sm btn-font-sm ' + tipe[data].class + '">' + tipe[data].title + '</span>';
                }
            }, {
                data: 'tanggal_dayoff',
                title: 'Tanggal Day-Off'
            }, {
                data: 'notes',
                title: 'Notes'
            }, {
                data: 'foto',
                title: 'Foto',
                render: function(data, type, row, meta) {
                    return '<label for="request_foto"  class="btn btn-link" style="padding:0px;"><i class="flaticon2-photo-camera"></i>Foto</label>';
                }
            }, {
                data: 'status',
                title: 'Status',
                render: function(data, type, row, meta) {
                    var status = {
                        approved: {
                            'title': 'Approved',
                            'class': 'btn-label-success'
                        },
                        waiting: {
                            'title': 'Waiting',
                            'class': 'btn-label-warning'
                        },
                        rejected: {
                            'title': 'Rejected',
                            'class': 'btn-label-danger'
                        }
                    }
                    if (typeof status[data] === 'undefined') {
                        return data;
                    }
                    return '<span style="width:100%" class="btn btn-bold btn-sm btn-font-sm ' + status[data].class + '">' + status[data].title + '</span>';
                }
            }],
            columnDefs: [{
                targets: [0, 1, 2, 3, 4, 5, 6],
                className: 'text-center',
                orderable: false,
            }],
        });

        datatable.on('order.dt search.dt', function() {
            datatable.column(0, {
                search: 'applied',
                order: 'applied'
            }).nodes().each(function(cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();
    };

    var initTablePayroll = function () {
        var table = $('#table_payroll');
        // begin first table
        var datatable = table.DataTable({
            order: [],
            responsive: true,
            ajax: {
                url: 'source/therapist/payroll.json',
                type: 'POST',
                data: {
                    pagination: {
                        perpage: 50,
                    },
                },
            },
            columns: [{
                data: 'null',
                title: 'No',
                render: function(data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                width: 35,
                orderable: false,
            }, {
                data: 'bulan',
                title: 'Bulan',
            }, {
                data: 'gaji',
                title: 'Total Gaji',
            }, {
                field: 'aksi',
                title: 'Aksi',
                responsivePriority: -1,
                className: 'text-center',
                orderable: false,
                width: 100,
                render: function(data, type, full, meta) {
                    return `
                    <a href="user_therapist/profile_payroll_detail.html" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
                },
            }],
            columnDefs: [{
                targets: [0, 1, 2, 3],
                className: 'text-center',
                orderable: true,
            }],
        });

        datatable.on('order.dt search.dt', function() {
            datatable.column(0, {
                search: 'applied',
                order: 'applied'
            }).nodes().each(function(cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();
    };

    var initTablePinjamanListRequest = function () {
        var table = $('#table_pinjaman_list_request');
        // begin first table
        table.DataTable({
            order: [],
            responsive: true,
            ajax: {
                url: 'source/therapist/pinjaman.json',
                type: 'POST',
                data: {
                    pagination: {
                        perpage: 50,
                    },
                },
            },
            columns: [{
                data: 'null',
                title: 'No',
                render: function(data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                width: 35,
                orderable: false,
            }, {
                data: 'nama',
                title: 'Nama'
            }, {
                data: 'nominal',
                title: 'Nominal'
            }, {
                data: 'termin',
                title: 'Termin Pembayaran'
            }, {
                data: 'notes',
                title: 'Notes'
            }, {
                data: 'status',
                title: 'Status',
                render: function (data, type, row, meta) {
                    var status = {
                        approve: {
                            'title': 'Approve',
                            'class': 'btn-label-success'
                        },
                        reject: {
                            'title': 'Reject',
                            'class': 'btn-label-danger'
                        }
                    };
                    if (typeof status[data] === 'undefined') {
                        return data;
                    }
                    return '<span style="width:100%" class="btn btn-bold btn-sm btn-font-sm ' + status[data].class + '">' + status[data].title + '</span>';
                }
            }, ],
            columnDefs: [{
                targets: [0, 1, 2, 3, 4, 5],
                className: 'text-center',
                orderable: false,
            }],
        });
    };

    var initTablePinjamanCurrent = function () {
        var table = $('#table_pinjaman_current');
        // begin first table
        table.DataTable({
            order: [],
            responsive: true,
            ajax: {
                url: 'source/therapist/pinjaman.json',
                type: 'POST',
                data: {
                    pagination: {
                        perpage: 50,
                    },
                },
            },
            columns: [{
                data: 'null',
                title: 'No',
                render: function(data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                width: 35,
                orderable: false,
            }, {
                data: 'nama',
                title: 'Nama'
            }, {
                data: 'nominal',
                title: 'Nominal'
            }, {
                data: 'termin',
                title: 'Termin Pembayaran'
            }, {
                data: 'notes',
                title: 'Notes'
            }, {
                field: 'aksi',
                title: 'Aksi',
                responsivePriority: -1,
                className: 'text-center',
                orderable: false,
                width: 100,
                render: function(data, type, full, meta) {
                    return `
                    <a href="user_therapist/profile_payroll_pinjaman_detail.html" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
                },
            }],
            columnDefs: [{
                targets: [0, 1, 2, 3, 4, 5],
                className: 'text-center',
                orderable: false,
            }],
        });
    };

    var initTableRequestInventoryRequestDetailRequest = function () {
        var i = 0;
        var table = $('#table_request_inventory_detail_request');
        var datatable = table.DataTable({
            order: [],
            info: false,
            paging: false,
            lengthChange: false,
            searching: false,
            responsive: true,
            ajax: {
                url: 'source/therapist/request_detail.json',
                type: 'POST',
                data: {
                    pagination: {
                        perpage: 50,
                    },
                },
            },
            columns: [{
                data: 'null',
                title: 'No',
                render: function(data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                width: 35,
                orderable: false,
            }, {
                data: 'jenis',
                title: 'Jenis'
            }, {
                data: 'barang',
                title: 'Barang'
            }, {
                data: 'satuan',
                title: 'Satuan'
            }, {
                data: 'request',
                title: 'Request'
            }, {
                field: 'disetujui',
                title: 'Disetujui',
                render: function(data, type, full, meta) {
                    return `<input type="number" min="1" class="form-control readonly" readonly>`;
                }
            }, {
                data: 'foto',
                title: 'Foto',
                render: function(data, type, full, meta) {
                    i++;
                    return `
                    <button type="button" class="btn btn-link" style="padding:0px;" data-toggle="modal" data-url="`+ data +`" data-target="#modal_foto"><i class="flaticon2-photo-camera"></i>Preview</button>`;
                }
            }],
			columnDefs: [{
                targets: [0, 1, 2, 3, 4, 5, 6],
                orderable: false,
				className: 'text-center'
            }],
        });

        $("#modal_foto").on('show.bs.modal', function (e) {
            var triggerLink = $(e.relatedTarget);
            var url = triggerLink.data("url");
            $(this).find("#foto_placement").html(`<img src="`+ url +`" class="uploaded_img">`);
        });
    };

    var initTableRequestInventoryRequestDetailDisetujui = function () {
        var i = 0;
        var table = $('#table_request_inventory_detail_disetujui');
        var datatable = table.DataTable({
            order: [],
            info: false,
            paging: false,
            lengthChange: false,
            searching: false,
            responsive: true,
            ajax: {
                url: 'source/therapist/request_detail.json',
                type: 'POST',
                data: {
                    pagination: {
                        perpage: 50,
                    },
                },
            },
            columns: [{
                data: 'null',
                title: 'No',
                render: function(data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                width: 35,
                orderable: false,
            }, {
                data: 'jenis',
                title: 'Jenis'
            }, {
                data: 'barang',
                title: 'Barang'
            }, {
                data: 'satuan',
                title: 'Satuan'
            }, {
                data: 'request',
                title: 'Request'
            }, {
                data: 'setuju',
                title: 'Disetujui'
            }, {
                data: 'foto',
                title: 'Foto',
                render: function(data, type, full, meta) {
                    return `
                    <button type="button" class="btn btn-link" style="padding:0px;" data-toggle="modal" data-url="`+ data +`" data-target="#modal_foto"><i class="flaticon2-photo-camera"></i>Preview</button>`;
                }
            }],
			columnDefs: [{
                targets: [0, 1, 2, 3, 4, 5, 6],
                orderable: false,
				className: 'text-center'
            }],
        });

        $("#modal_foto").on('show.bs.modal', function (e) {
            var triggerLink = $(e.relatedTarget);
            var url = triggerLink.data("url");
            $(this).find("#foto_placement").html(`<img src="`+ url +`" class="uploaded_img">`);
        });
    };

    return {
        //main function to initiate the module
        init: function() {
            initTableActiveTreatment();
            initTableListTreatment();
            initTableComplaint();
            initTableTreatmentDetail();
            initTableStock();
            initTableRequestInventory();
            initTablePemakaianInventory();
            initTableKehadiran();
            initTableSPKComplaint();
            initTableRequestDayOff();
            initTablePayroll();
            initTablePinjamanListRequest();
            initTablePinjamanCurrent();
            initTableRequestInventoryRequestDetailRequest();
            initTableRequestInventoryRequestDetailDisetujui();
        },
    };
}();


jQuery(document).ready(function() {
    KTDatatablesSearchOptionsAdvancedSearch.init();
});
