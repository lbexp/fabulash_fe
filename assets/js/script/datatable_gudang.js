"use strict";

// begin: Admin Page
var KTDatatablesSearchOptionsAdvancedSearch = function() {

    $.fn.dataTable.Api.register('column().title()', function() {
        return $(this.header()).text().trim();
    });

    var initTableDataBarang = function() {
        var table = $('#table_data_barang');
        // begin first table
        var datatable = table.DataTable({
            order: [],
            info: true,
            paging: true,
            lengthChange: true,
            searching: true,
            responsive: true,
            ajax: {
                url: 'source/gudang/data_barang.json',
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
                title: 'Nama Barang'
            }, {
                data: 'satuan_kecil',
                title: 'Satuan Kecil'
            }, {
                data: 'satuan_sedang',
                title: 'Satuan Sedang'
            }, {
                data: 'satuan_besar',
                title: 'Satuan Besar'
            }, {
                data: 'jumlah_satuan_sedang_banding_kecil',
                title: 'Sedang : Kecil'
            }, {
                data: 'jumlah_satuan_besar_banding_sedang',
                title: 'Besar : Sedang'
            }, {
                data: 'tipe_barang',
                title: 'Tipe Barang'
            }, {
                field: 'aksi',
                title: 'Aksi',
                responsivePriority: -1,
                className: 'text-center',
                orderable: false,
                width: 100,
                render: function(data, type, full, meta) {
                    return `
                    <button type="button" class="btn btn-sm btn-danger" style="color:white;border-radius:15px" onClick="swalDelete();">Delete</button>`;
                },
            }, ],
            columnDefs: [{
                targets: [0, 1, 2, 3, 4, 5, 6, 7],
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

    var initTableDataSatuan = function() {
        var table = $('#table_data_satuan');
        // begin first table
        var datatable = table.DataTable({
            order: [],
            info: true,
            paging: true,
            lengthChange: true,
            searching: true,
            responsive: true,
            ajax: {
                url: 'source/gudang/data_satuan.json',
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
                data: 'satuan',
                title: 'Nama Satuan'
            }, {
                field: 'aksi',
                title: 'Aksi',
                responsivePriority: -1,
                className: 'text-center',
                orderable: false,
                width: 100,
                render: function(data, type, full, meta) {
                    return `
                    <button type="button" class="btn btn-sm btn-danger" style="color:white;border-radius:15px" onClick="swalDelete();">Delete</button>`;
                },
            }, ],
            columnDefs: [{
                targets: [0, 1],
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

    var initTableStock = function() {
        var table = $('#table_stock');
        // begin first table
        var datatable = table.DataTable({
            order: [],
            responsive: true,
            ajax: {
                url: 'source/gudang/stock.json',
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
                title: 'Barang',
            }, {
                data: 'jumlah',
                title: 'Jumlah',
            }, {
                data: 'satuan_besar',
                title: 'Satuan Besar',
            }, {
                data: 'foto',
                title: 'Foto',
                render: function (data, type, full, meta) {
                    return `
                    <button type="button" class="btn btn-link" style="padding:0px;" data-toggle="modal" data-url="`+ data +`" data-target="#modal_foto"><i class="flaticon2-photo-camera"></i> Foto</button>`;
                }
            }, {
                field: 'aksi',
                title: 'Aksi',
                responsivePriority: -1,
                className: 'text-center',
                orderable: false,
                width: 100,
                render: function(data, type, full, meta) {
                    return `
                    <a href="user_gudang/stock_barang_detail.html" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
                },
            }],
            columnDefs: [{
                targets: [0, 1, 2, 3, 4],
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

        $("#modal_foto").on('show.bs.modal', function (e) {
            var triggerLink = $(e.relatedTarget);
            var url = triggerLink.data("url");
            $(this).find("#foto_placement").html(`<img src="`+ url +`" class="uploaded_img">`);
        });
    };

    var initTableStockBarangKeluar = function() {
        // begin first table
        var table = $('#table_stock_barang_keluar').DataTable({
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
                url: 'source/gudang/stock_barang.json',
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
                data: 'no_spk',
                title: 'No. Request',
            }, {
                data: 'jumlah',
                title: 'Jumlah',
            }, {
                data: 'studio',
                title: 'Studio',
            }, {
                field: 'aksi',
                title: 'Aksi',
                responsivePriority: -1,
                className: 'text-center',
                orderable: false,
                width: 100,
                render: function(data, type, full, meta) {
                    return `
                    <a href="user_gudang/request_stock_detail" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
                },
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

        $('#datepicker_stock_barang_keluar').on('change', function(e) {
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

        $('#search_stock_barang_keluar').on('keyup', function() {
            table.search(this.value).draw();
        });

        $('#datepicker_stock_barang_keluar').datepicker({
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

    var initTableStockBarangMasuk = function() {
        // begin first table
        var table = $('#table_stock_barang_masuk').DataTable({
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
                url: 'source/gudang/stock_barang.json',
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
                data: 'no_spk',
                title: 'No. Pembelian',
            }, {
                data: 'jumlah',
                title: 'Jumlah',
            }, {
                data: 'studio',
                title: 'Studio',
            }, {
                field: 'aksi',
                title: 'Aksi',
                responsivePriority: -1,
                className: 'text-center',
                orderable: false,
                width: 100,
                render: function(data, type, full, meta) {
                    return `
                    <a href="user_gudang/pembelian_barang_detail.html" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
                },
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

        $('#datepicker_stock_barang_masuk').on('change', function(e) {
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

        $('#search_stock_barang_masuk').on('keyup', function() {
            table.search(this.value).draw();
        });

        $('#datepicker_stock_barang_masuk').datepicker({
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

    var initTableStockHistoryIn = function () {
        // begin first table
        var table = $('#table_stock_history_in').DataTable({
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
                url: 'source/gudang/stock_history.json',
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
                data: 'no_spk',
                title: 'No. Pembelian',
            }, {
                data: 'barang',
                title: 'Barang',
            }, {
                field: 'aksi',
                title: 'Aksi',
                responsivePriority: -1,
                className: 'text-center',
                orderable: false,
                width: 100,
                render: function(data, type, full, meta) {
                    return `
                    <a href="user_gudang/pembelian_barang_detail.html" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
                },
            }],
            columnDefs: [{
                targets: [0, 1, 2, 3],
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

        $('#datepicker_stock_history_in').on('change', function(e) {
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

        $('#search_stock_history_in').on('keyup', function() {
            table.search(this.value).draw();
        });

        $('#datepicker_stock_history_in').datepicker({
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

    var initTableStockHistoryOut = function () {
        // begin first table
        var table = $('#table_stock_history_out').DataTable({
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
                url: 'source/gudang/stock_history.json',
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
                data: 'no_spk',
                title: 'No. Request',
            }, {
                data: 'barang',
                title: 'Barang',
            }, {
                field: 'aksi',
                title: 'Aksi',
                responsivePriority: -1,
                className: 'text-center',
                orderable: false,
                width: 100,
                render: function(data, type, full, meta) {
                    return `
                    <a href="user_gudang/request_stock_detail.html" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
                },
            }],
            columnDefs: [{
                targets: [0, 1, 2, 3],
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

        $('#datepicker_stock_history_out').on('change', function(e) {
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

        $('#search_stock_history_out').on('keyup', function() {
            table.search(this.value).draw();
        });

        $('#datepicker_stock_history_out').datepicker({
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

    var initTableRequestStock = function() {
        // begin first table
        var table = $('#table_request_stock').DataTable({
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
                url: 'source/gudang/request_stock.json',
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
                data: 'no_request',
                title: 'No. Request',
            }, {
                data: 'studio',
                title: 'Studio',
            }, {
                data: 'list_barang',
                title: 'List Barang',
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
                        Terkirim: {
                            'title': 'Terkirim',
                            'class': 'btn-label-brand'
                        },
                        Diterima: {
                            'title': 'Diterima',
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
                        Request: {'href': 'request_stock_detail_request.html'},
                        Terkirim: {'href': 'request_stock_detail_terkirim.html'},
                        Diterima: {'href': 'request_stock_detail_diterima.html'}
                    }
                    return `
                    <a href="user_gudang/${status[full.status].href}" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
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

        $('#datepicker_request_stock').on('change', function(e) {
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

        $('#search_request_stock').on('keyup', function() {
            table.search(this.value).draw();
        });

        $('#datepicker_request_stock').datepicker({
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
                url: 'source/gudang/kehadiran.json',
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
            clearBtn: true,
            rtl: KTUtil.isRTL(),
            templates: {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>',
            },
        }).datepicker("setDate", new Date());
    };

    var initTableKehadiranDayOff = function () {
        var table = $('#table_kehadiran_request_dayoff');
        // begin first table
        table.DataTable({
            order: [],
            responsive: true,
            ajax: {
                url: 'source/gudang/request_dayoff.json',
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
    };

    var initTableRequestStockDetailRequest = function () {
        var i = 0;
        var table = $('#table_request_stock_detail_request');
        var datatable = table.DataTable({
            order: [],
            info: false,
            paging: false,
            lengthChange: false,
            searching: false,
            responsive: true,
            ajax: {
                url: 'source/gudang/request_stock_detail.json',
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
                data: 'satuan',
                title: 'Satuan'
            }, {
                data: 'request',
                title: 'Request'
            }, {
                field: 'terkirim',
                title: 'Terkirim',
                render: function(data, type, full, meta) {
                    i++;
                    return `<input name="request_jumlah_terkirim`+ i +`" type="number" min="1" class="form-control request_required" placeholder="Jumlah">`;
                }
            }, {
                field: 'diterima',
                title: 'Diterima',
                render: function(data, type, full, meta) {
                    return `<input type="number" min="1" class="form-control readonly" readonly>`;
                }
            }, {
                field: 'margin',
                title: 'Margin Hilang',
                render: function(data, type, full, meta) {
                    return `<input type="number" min="1" class="form-control readonly" readonly>`;
                }
            }],
			columnDefs: [{
                targets: [0, 1, 2, 3, 4, 5, 6],
                orderable: false,
				className: 'text-center'
            }],
        });
    };

    var initTableRequestStockDetailTerkirim = function () {
        var table = $('#table_request_stock_detail_terkirim');
        var datatable = table.DataTable({
            order: [],
            info: false,
            paging: false,
            lengthChange: false,
            searching: false,
            responsive: true,
            ajax: {
                url: 'source/gudang/request_stock_detail.json',
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
                data: 'satuan',
                title: 'Satuan'
            }, {
                data: 'request',
                title: 'Request'
            }, {
                data: 'terkirim',
                title: 'Terkirim'
            }, {
                field: 'diterima',
                title: 'Diterima',
                render: function(data, type, full, meta) {
                    return `<input type="number" min="1" class="form-control readonly" readonly>`;
                }
            }, {
                field: 'margin',
                title: 'Margin Hilang',
                render: function(data, type, full, meta) {
                    return `<input type="number" min="1" class="form-control readonly" readonly>`;
                }
            }],
			columnDefs: [{
                targets: [0, 1, 2, 3, 4, 5, 6],
                orderable: false,
				className: 'text-center'
            }],
        });
    };

    var initTableRequestStockDetailDiterima = function () {
        var table = $('#table_request_stock_detail_diterima');
        var datatable = table.DataTable({
            order: [],
            info: false,
            paging: false,
            lengthChange: false,
            searching: false,
            responsive: true,
            ajax: {
                url: 'source/gudang/request_stock_detail.json',
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
                data: 'satuan',
                title: 'Satuan'
            }, {
                data: 'request',
                title: 'Request'
            }, {
                data: 'terkirim',
                title: 'Terkirim'
            }, {
                data: 'diterima',
                title: 'Diterima'
            }, {
                data: 'margin',
                title: 'Margin Hilang'
            }],
			columnDefs: [{
                targets: [0, 1, 2, 3, 4, 5, 6],
                orderable: false,
				className: 'text-center'
            }],
        });
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
                    <a href="user_gudang/profile_payroll_detail.html" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
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
                        approved: {
                            'title': 'Approved',
                            'class': 'btn-label-success'
                        },
                        rejected: {
                            'title': 'Rejected',
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
            }],
            columnDefs: [{
                targets: [0, 1, 2, 3, 4],
                className: 'text-center',
                orderable: false,
            }],
        });
    };

    return {
        //main function to initiate the module
        init: function() {
            initTableDataBarang();
            initTableDataSatuan();
            initTableStock();
            initTableStockBarangKeluar();
            initTableStockBarangMasuk();
            initTableStockHistoryIn();
            initTableStockHistoryOut();
            initTableRequestStock();
            initTableKehadiran();
            initTableKehadiranDayOff();
            initTableRequestStockDetailRequest();
            initTableRequestStockDetailTerkirim();
            initTableRequestStockDetailDiterima();
            initTablePayroll();
            initTablePinjamanListRequest();
            initTablePinjamanCurrent();
        },
    };
}();


jQuery(document).ready(function() {
    KTDatatablesSearchOptionsAdvancedSearch.init();
});
