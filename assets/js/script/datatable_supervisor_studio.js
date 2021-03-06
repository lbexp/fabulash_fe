"use strict";

// begin: Inventory
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
                url: 'source/supervisor_studio/treatment.json',
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
                data: 'durasi',
                title: 'Durasi',
            }, {
                data: 'treatment',
                title: 'Treatment',
            }, {
                data: 'customer',
                title: 'Customer',
                render: function(data, type, full, meta) {
                    return `<a href="user_supervisor_studio/customer_detail.html">`+ data +`</a>`;
                }
            }, {
                data: 'therapist',
                title: 'Therapist',
                render: function(data, type, full, meta) {
                    return `<a href="user_supervisor_studio/karyawan_detail.html">`+ data +`</a>`;
                }
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
                        waiting: {
                            'title': 'Waiting',
                            'class': 'btn-label-warning'
                        },
                        ongoing: {
                            'title': 'Ongoing',
                            'class': 'btn-label-primary'
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
                        waiting: {'href': 'treatment_detail_waiting.html'},
                        ongoing : {'href': 'treatment_detail_ongoing.html'},
                        done : {'href': 'treatment_detail_done.html'}
                    };
                    return `
                    <a href="user_supervisor_studio/${status[full.status].href}" class="btn btn-sm btn-brand" style="color:white;border-radius:2rem"><i class="fa fa-info-circle"></i> Rincian</a>`;
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
        })/*.datepicker("setDate", new Date());*/
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
                url: 'source/supervisor_studio/invoice.json',
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

    var initTablePaidTreatment = function() {
        // begin first table
        var table = $('#table_treatment_paid').DataTable({
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
                url: 'source/supervisor_studio/treatment.json',
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
                title: 'No Pesanan',
            }, {
                data: 'kategori',
                title: 'Kategori',
            }, {
                data: 'treatment',
                title: 'Treatment',
            }, {
                data: 'customer',
                title: 'Customer',
                render: function(data, type, full, meta) {
                    return `<a href="user_supervisor_studio/customer_detail.html">`+ data +`</a>`;
                }
            }, {
                data: 'therapist',
                title: 'Therapist',
                render: function(data, type, full, meta) {
                    return `<a href="user_supervisor_studio/karyawan_detail.html">`+ data +`</a>`;
                }
            }, {
                data: 'waktu_mulai',
                title: 'Waktu Mulai',
            }, {
                data: 'waktu_selesai',
                title: 'Waktu Selesai',
            }, {
                data: 'harga',
                title: 'Harga',
            }, {
                data: 'foto',
                title: 'Foto',
                render: function(data, type, full, meta) {
                    return `<button type="button" class="btn btn-link" style="padding:0px;" data-toggle="modal" data-url="`+ data +`" data-target="#modal_foto"><i class="flaticon2-photo-camera"></i> Foto</button>`;
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
                    <a href="user_supervisor_studio/treatment_detail_paid.html" class="btn btn-sm btn-brand" style="color:white;border-radius:2rem"><i class="fa fa-info-circle"></i> Rincian</a>`;
                },
            }],
            columnDefs: [{
                targets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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

        $('#datepicker_treatment_paid').on('change', function(e) {
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

        $('#search_treatment_paid').on('keyup', function() {
            table.search(this.value).draw();
        });

        $('#datepicker_treatment_paid').datepicker({
            todayHighlight: true,
            language: 'id',
            rtl: KTUtil.isRTL(),
            todayBtn: "linked",
            clearBtn: true,
            templates: {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>',
            },
        })/*.datepicker("setDate", new Date());*/
    };

    var initTableVoidTreatment = function() {
        // begin first table
        var table = $('#table_treatment_void').DataTable({
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
                url: 'source/supervisor_studio/treatment.json',
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
                title: 'No Pesanan',
            }, {
                data: 'customer',
                title: 'Customer',
                render: function(data, type, full, meta) {
                    return `<a href="user_supervisor_studio/customer_detail.html">`+ data +`</a>`;
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
                    <a href="user_supervisor_studio/treatment_detail_paid.html" class="btn btn-sm btn-brand" style="color:white;border-radius:2rem"><i class="fa fa-info-circle"></i> Rincian</a>`;
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

        $('#datepicker_treatment_void').on('change', function(e) {
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

        $('#search_treatment_void').on('keyup', function() {
            table.search(this.value).draw();
        });

        $('#datepicker_treatment_void').datepicker({
            todayHighlight: true,
            language: 'id',
            rtl: KTUtil.isRTL(),
            todayBtn: "linked",
            clearBtn: true,
            templates: {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>',
            },
        })/*.datepicker("setDate", new Date());*/
    };

    var initTableSPKScheduled = function () {
        var table = $('#table_spk_scheduled');
        // begin first table
        table.DataTable({
            order: [],
            info: false,
            paging: false,
            lengthChange: false,
            searching: false,
            responsive: true,
            ajax: {
                url: 'source/supervisor_studio/spk.json',
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
                title: 'Therapist',
                render: function(data, type, full, meta) {
                    return `<a href="user_supervisor_studio/karyawan_detail.html">`+ data +`</a>`;
                }
            }, ],
            columnDefs: [{
                targets: [0, 1, 2],
                className: 'text-center',
                orderable: false,
            }],
        });
    };

    var initTableSPKWaiting = function () {
        var table = $('#table_spk_waiting');
        // begin first table
        table.DataTable({
            order: [],
            info: false,
            paging: false,
            lengthChange: false,
            searching: false,
            responsive: true,
            ajax: {
                url: 'source/supervisor_studio/spk.json',
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
                title: 'Therapist',
                render: function(data, type, full, meta) {
                    return `<a href="user_supervisor_studio/karyawan_detail.html">`+ data +`</a>`;
                }
            }, ],
            columnDefs: [{
                targets: [0, 1, 2],
                className: 'text-center',
                orderable: false,
            }],
        });
    };

    var initTableSPKOngoing = function () {
        var table = $('#table_spk_ongoing');
        // begin first table
        table.DataTable({
            order: [],
            info: false,
            paging: false,
            lengthChange: false,
            searching: false,
            responsive: true,
            ajax: {
                url: 'source/supervisor_studio/spk.json',
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
                title: 'Therapist',
                render: function(data, type, full, meta) {
                    return `<a href="user_supervisor_studio/karyawan_detail.html">`+ data +`</a>`;
                }
            }, {
                data: 'waktu_mulai',
                title: 'Waktu Mulai'
            }, ],
            columnDefs: [{
                targets: [0, 1, 2, 3],
                className: 'text-center',
                orderable: false,
            }],
        });
    };

    var initTableSPKDone = function () {
        var table = $('#table_spk_done');
        // begin first table
        table.DataTable({
            order: [],
            info: false,
            paging: false,
            lengthChange: false,
            searching: false,
            responsive: true,
            ajax: {
                url: 'source/supervisor_studio/spk.json',
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
                title: 'Therapist',
                render: function(data, type, full, meta) {
                    return `<a href="user_supervisor_studio/karyawan_detail.html">`+ data +`</a>`;
                }
            }, {
                data: 'inventory',
                title: 'Inventory'
            }, {
                data: 'durasi',
                title: 'Durasi'
            }, ],
            columnDefs: [{
                targets: [0, 1, 2, 3],
                className: 'text-center',
                orderable: false,
            }],
        });
    };

    var initTableSPKPaid = function () {
        var table = $('#table_spk_paid');
        // begin first table
        table.DataTable({
            order: [],
            info: false,
            paging: false,
            lengthChange: false,
            searching: false,
            responsive: true,
            ajax: {
                url: 'source/supervisor_studio/spk.json',
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
                title: 'Therapist',
                render: function(data, type, full, meta) {
                    return `<a href="user_supervisor_studio/karyawan_detail.html">`+ data +`</a>`;
                }
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

    var initTableInvoice = function () {
        var table = $('#table_invoice');
        // begin first table
        table.DataTable({
            order: [],
            info: false,
            paging: false,
            lengthChange: false,
            searching: false,
            responsive: true,
            ajax: {
                url: 'source/supervisor_studio/invoice.json',
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
                data: 'therapist',
                title: 'Therapist',
                render: function(data, type, full, meta) {
                    return `<a href="user_supervisor_studio/karyawan_detail.html">`+ data +`</a>`;
                }
            }, {
                data: 'harga',
                title: 'Harga'
            }, ],
            columnDefs: [{
                targets: [0, 1, 2, 3],
                className: 'text-center',
                orderable: false,
            }],
        });
    };

    var initTableStock = function() {
        var table = $('#table_stock');
        // begin first table
        var datatable = table.DataTable({
            order: [],
            responsive: true,
            ajax: {
                url: 'source/supervisor_studio/inventory.json',
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
                data: 'isi_satuan',
                title: 'Isi Per Satuan',
            }, {
                data: 'satuan',
                title: 'Satuan',
            }, {
                data: 'persediaan',
                title: 'Persediaan',
            },{
                field: 'aksi',
                title: 'Aksi',
                responsivePriority: -1,
                className: 'text-center',
                orderable: false,
                width: 100,
                render: function(data, type, full, meta) {
                    return `
                    <a href="user_supervisor_studio/stock_detail.html" class="btn btn-sm btn-brand" style="color:white;border-radius:2rem"><i class="fa fa-info-circle"></i> Rincian</a>`;
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
    };

    var initTableStockDetailIn = function() {
        // begin first table
        var table = $('#table_stock_detail_in').DataTable({
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
                url: 'source/supervisor_studio/stock_detail.json',
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
                title: 'Tanggal'
            }, {
                data: 'no_request',
                title: 'No. Request',
                render: function(data, type, full, meta) {
                    return `<a href="user_supervisor_studio/request_in_detail_disetujui.html">`+ data +`</a>`;
                }
            }, {
                data: 'quantity',
                title: 'Quantity'
            }, {
                data: 'harga',
                title: 'Harga'
            }, {
                field: 'aksi',
                title: 'Aksi',
                responsivePriority: -1,
                className: 'text-center',
                orderable: false,
                width: 100,
                render: function(data, type, full, meta) {
                    return `
                    <button class="btn btn-sm btn-danger" onClick="swalVoid();" style="color:white;border-radius:2rem">Void</button>`;
                },
            }, ],
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

        $('#monthpicker_stock_detail_in').on('change', function(e) {
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

        $('#search_stock_detail_in').on('keyup', function() {
            table.search(this.value).draw();
        });

        $('#monthpicker_stock_detail_in').datepicker({
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
        })/*.datepicker("setDate", new Date());*/
    };

    var initTableStockDetailOut = function() {
        // begin first table
        var table = $('#table_stock_detail_out').DataTable({
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
                url: 'source/supervisor_studio/stock_detail.json',
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
                title: 'Tanggal'
            }, {
                data: 'no_request',
                title: 'No. Request',
                render: function(data, type, full, meta) {
                    return `<a href="user_supervisor_studio/request_out_detail_diterima.html">`+ data +`</a>`;
                }
            }, {
                data: 'quantity',
                title: 'Quantity'
            }, {
                field: 'aksi',
                title: 'Aksi',
                responsivePriority: -1,
                className: 'text-center',
                orderable: false,
                width: 100,
                render: function(data, type, full, meta) {
                    return `
                    <button class="btn btn-sm btn-danger" onClick="swalVoid();" style="color:white;border-radius:2rem">Void</button>`;
                },
            }, ],
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

        $('#monthpicker_stock_detail_out').on('change', function(e) {
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

        $('#search_stock_detail_out').on('keyup', function() {
            table.search(this.value).draw();
        });

        $('#monthpicker_stock_detail_out').datepicker({
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
        })/*.datepicker("setDate", new Date());*/
    };

    var initTableRequestIn = function() {
        // begin first table
        var table = $('#table_request_in').DataTable({
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
                url: 'source/supervisor_studio/request_in.json',
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
                data: 'kode_request',
                title: 'Kode Request',
            }, {
                data: 'therapist',
                title: 'Therapist',
                render: function(data, type, full, meta) {
                    return `<a href="user_supervisor_studio/karyawan_detail.html">`+ data +`</a>`;
                }
            }, {
                data: 'list_request',
                title: 'List Request',
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
                        Request: {'href': 'request_in_detail_request.html'},
                        Disetujui: {'href': 'request_in_detail_disetujui.html'}
                    };
                    return `
                    <a href="user_supervisor_studio/${status[full.status].href}" class="btn btn-sm btn-brand" style="color:white;border-radius:2rem"><i class="fa fa-info-circle"></i> Rincian</a>`;
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

        $('#monthpicker_request_in').on('change', function(e) {
            e.preventDefault();
            var params = {};
            $('#monthpicker_request_in').each(function() {
                var i = $(this).data('col-index');
                if (params[i]) {
                    params[i] += '|' + $(this).val();
                } else {
                    params[i] = $(this).val();
                }
            });
            $.each(params, function(i, val) {
                // apply search params to datatable
                table.column(i).search(val ? val : '', false, false);
            });
            table.table().draw();
        });

        $('#search_request_in').on('keyup', function() {
            table.search(this.value).draw();
        });

        $('#monthpicker_request_in').datepicker({
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
        })/*.datepicker("setDate", new Date());*/
    };

    var initTableRequestOut = function() {
        // begin first table
        var table = $('#table_request_out').DataTable({
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
                url: 'source/supervisor_studio/request_out.json',
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
                        Request: {'href': 'request_out_detail_request.html'},
                        Terkirim: {'href': 'request_out_detail_terkirim.html'},
                        Diterima: {'href': 'request_out_detail_diterima.html'}
                    }
                    return `
                    <a href="user_supervisor_studio/${status[full.status].href}" class="btn btn-sm btn-brand" style="color:white;border-radius:2rem"><i class="fa fa-info-circle"></i> Rincian</a>`;
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

        $('#monthpicker_request_out').on('change', function(e) {
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

        $('#search_request_out').on('keyup', function() {
            table.search(this.value).draw();
        });

        $('#monthpicker_request_out').datepicker({
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
        })/*.datepicker("setDate", new Date());*/
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
                url: 'source/supervisor_studio/kehadiran.json',
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
        })/*.datepicker("setDate", new Date());*/
    };

    var initTableKehadiranDayOff = function () {
        var table = $('#table_kehadiran_request_dayoff');
        // begin first table
        var datatable = table.DataTable({
            order: [],
            responsive: true,
            ajax: {
                url: 'source/supervisor_studio/request_dayoff.json',
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

    var initTableKaryawanKehadiran = function () {
        // begin first table
        var table = $('#table_karyawan_kehadiran').DataTable({
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
                url: 'source/supervisor_studio/karyawan_kehadiran.json',
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
                data: 'karyawan',
                title: 'Karyawan',
                render: function(data, type, full, meta) {
                    return `<a href="user_supervisor_studio/karyawan_detail.html">`+ data +`</a>`;
                }
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

        $('#datepicker_karyawan_kehadiran').on('change', function(e) {
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

        $('#search_karyawan_kehadiran').on('keyup', function() {
            table.search(this.value).draw();
        });

        $('#datepicker_karyawan_kehadiran').datepicker({
            todayHighlight: true,
            language: 'id',
            rtl: KTUtil.isRTL(),
            todayBtn: "linked",
            clearBtn: true,
            templates: {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>',
            },
        })/*.datepicker("setDate", new Date());*/
    };

    var initTableKaryawanList = function() {
        var table = $('#table_karyawan_list');
        // begin first table
        var datatable = table.DataTable({
            order: [],
            info: true,
            paging: true,
            lengthChange: true,
            searching: true,
            responsive: true,
            ajax: {
                url: 'source/supervisor_studio/karyawan.json',
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
                data: 'bagian',
                title: 'Bagian'
            }, {
                data: 'jumlahTreatment',
                title: 'Jumlah Treatment',
                render: function(data, type, full, meta) {
                    return data + ` Treatment`;
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
                    <a href="user_supervisor_studio/karyawan_detail.html" class="btn btn-sm btn-brand" style="color:white;border-radius:2rem"><i class="fa fa-info-circle"></i> Rincian</a>`;
                },
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

    var initTableKaryawanTreatment = function() {
        // begin first table
        var table = $('#table_karyawan_treatment').DataTable({
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
                url: 'source/supervisor_studio/treatment.json',
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
                title: 'Tanggal'
            }, {
                data: 'no_pesanan',
                title: 'No. Pesanan',
                render: function(data, type, full, meta) {
                    return `<a href="user_supervisor_studio/treatment_detail_done.html">`+ data +`</a>`;
                }
            }, {
                data: 'waktu_mulai',
                title: 'Waktu Mulai'
            }, {
                data: 'treatment',
                title: 'Treatment'
            }, {
                data: 'customer',
                title: 'Customer',
                render: function(data, type, full, meta) {
                    return `<a href="user_supervisor_studio/customer_detail.html">`+ data +`</a>`;
                }
            }, {
                data: 'therapist',
                title: 'Therapist'
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

        $('#monthpicker_karyawan_treatment').on('change', function(e) {
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

        $('#search_karyawan_treatment').on('keyup', function() {
            table.search(this.value).draw();
        });

        $('#monthpicker_karyawan_treatment').datepicker({
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
        })/*.datepicker("setDate", new Date());*/
    };

    var initTableKaryawanComplaint = function() {
        // begin first table
        var table = $('#table_karyawan_complaint').DataTable({
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
                url: 'source/supervisor_studio/treatment.json',
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
                render: function(data, type, full, meta) {
                    return `<a href="user_supervisor_studio/treatment_detail_paid.html">`+ data +`</a>`;
                }
            }, {
                data: 'treatment',
                title: 'Treatment',
            }, {
                data: 'customer',
                title: 'Customer',
                render: function(data, type, full, meta) {
                    return `<a href="user_supervisor_studio/customer_detail.html">`+ data +`</a>`;
                }
            }, {
                data: 'complaint',
                title: 'Complaint',
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

        $('#monthpicker_karyawan_complaint').on('change', function(e) {
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

        $('#search_karyawan_complaint').on('keyup', function() {
            table.search(this.value).draw();
        });

        $('#monthpicker_karyawan_complaint').datepicker({
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
        })/*.datepicker("setDate", new Date());*/
    };

    var initTableKaryawanKehadiranDetail = function () {
        // begin first table
        var table = $('#table_karyawan_kehadiran_detail').DataTable({
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
                url: 'source/supervisor_studio/karyawan_kehadiran.json',
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

        $('#monthpicker_karyawan_kehadiran_detail').on('change', function(e) {
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

        $('#search_karyawan_kehadiran_detail').on('keyup', function() {
            table.search(this.value).draw();
        });

        $('#monthpicker_karyawan_kehadiran_detail').datepicker({
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
        })/*.datepicker("setDate", new Date());*/
    };

    var initTableKaryawanInventory = function () {
        var table = $('#table_karyawan_inventory_sisa');
        // begin first table
        var datatable = table.DataTable({
            order: [],
            responsive: true,
            ajax: {
                url: 'source/supervisor_studio/karyawan_inventory.json',
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

    var initTableKaryawanInventoryPenggunaan = function () {
        var table = $('#table_karyawan_inventory_penggunaan').DataTable({
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
                url: 'source/supervisor_studio/karyawan_inventory_penggunaan.json',
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
                title: 'Tanggal'
            }, {
                data: 'kode_spk',
                title: 'Kode SPK',
                render: function(data, type, full, meta) {
                    return `<a href="user_supervisor_studio/treatment_detail_paid.html">`+ data +`</a>`;
                }
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

        $('#monthpicker_karyawan_inventory_penggunaan').on('change', function(e) {
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

        $('#search_karyawan_inventory_penggunaan').on('keyup', function() {
            table.search(this.value).draw();
        });

        $('#monthpicker_karyawan_inventory_penggunaan').datepicker({
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
        })/*.datepicker("setDate", new Date());*/
    };

    var initTableKaryawanInventoryRequest = function () {
        // begin first table
        var table = $('#table_karyawan_inventory_request').DataTable({
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
                url: 'source/supervisor_studio/karyawan_inventory_penggunaan.json',
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
                title: 'Tanggal'
            }, {
                data: 'kode_spk',
                title: 'Kode SPK',
                render: function(data, type, full, meta) {
                    return `<a href="user_supervisor_studio/request_in_detail_disetujui.html">`+ data +`</a>`;
                }
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

        $('#monthpicker_karyawan_inventory_request').on('change', function(e) {
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

        $('#search_karyawan_inventory_request').on('keyup', function() {
            table.search(this.value).draw();
        });

        $('#monthpicker_karyawan_inventory_request').datepicker({
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
        })/*.datepicker("setDate", new Date());*/
    };

    var initTableRequestInDetailRequest = function () {
        var i = 0;
        var table = $('#table_request_in_detail_request');
        var datatable = table.DataTable({
            order: [],
            info: false,
            paging: false,
            lengthChange: false,
            searching: false,
            responsive: true,
            ajax: {
                url: 'source/supervisor_studio/request_in_detail.json',
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
                    i++;
                    return `<input name="request_jumlah_disetujui`+ i +`" type="number" min="1" class="form-control request_required" placeholder="Jumlah">`;
                }
            }, {
                data: 'foto',
                title: 'Foto',
                render: function(data, type, full, meta) {
                    return `
                    <button type="button" class="btn btn-link" style="padding:0px;" data-toggle="modal" data-url="`+ data +`" data-target="#modal_foto"><i class="flaticon2-photo-camera"></i> Foto</button>`;
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

    var initTableRequestInDetailDisetujui = function () {
        var i = 0;
        var table = $('#table_request_in_detail_disetujui');
        var datatable = table.DataTable({
            order: [],
            info: false,
            paging: false,
            lengthChange: false,
            searching: false,
            responsive: true,
            ajax: {
                url: 'source/supervisor_studio/request_in_detail.json',
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
                    <button type="button" class="btn btn-link" style="padding:0px;" data-toggle="modal" data-url="`+ data +`" data-target="#modal_foto"><i class="flaticon2-photo-camera"></i> Foto</button>`;
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

    var initTableRequestOutDetailRequest = function () {
        var table = $('#table_request_out_detail_request');
        var datatable = table.DataTable({
            order: [],
            info: false,
            paging: false,
            lengthChange: false,
            searching: false,
            responsive: true,
            ajax: {
                url: 'source/supervisor_studio/request_out_detail.json',
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
                    return `<input type="number" min="1" class="form-control readonly" readonly>`;
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

    var initTableRequestOutDetailTerkirim = function () {
        var i = 0;
        var table = $('#table_request_out_detail_terkirim');
        var datatable = table.DataTable({
            order: [],
            info: false,
            paging: false,
            lengthChange: false,
            searching: false,
            responsive: true,
            ajax: {
                url: 'source/supervisor_studio/request_out_detail.json',
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
                    i++;
                    return `<input name="request_jumlah_diterima`+ i +`" type="number" min="1" class="form-control request_required" placeholder="Jumlah">`;
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

    var initTableRequestOutDetailDiterima = function () {
        var table = $('#table_request_out_detail_diterima');
        var datatable = table.DataTable({
            order: [],
            info: false,
            paging: false,
            lengthChange: false,
            searching: false,
            responsive: true,
            ajax: {
                url: 'source/supervisor_studio/request_out_detail.json',
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

    var initTableCustomer = function() {
        var table = $('#table_customer');
        // begin first table
        var datatable = table.DataTable({
            order: [],
            responsive: true,
            ajax: {
                url: 'source/supervisor_studio/customer.json',
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
                data: 'alamat',
                title: 'Alamat'
            }, {
                data: 'no_hp',
                title: 'No. Telepon'
            }, {
                data: 'tanggal_lahir',
                title: 'Tanggal Lahir'
            }, {
                data: 'jumlah_treatment',
                title: 'Jumlah Treatment',
                render: function(data, type, full, meta) {
                    if (data <= 10){
                        return `<span style="width:80%" class="btn btn-bold btn-sm btn-font-sm btn-label-danger">${data} Treatment</span>`;
                    }
                    else if (data <= 30) {
                        return `<span style="width:80%" class="btn btn-bold btn-sm btn-font-sm btn-label-brand">${data} Treatment</span>`;
                    }
                    else if (data > 30) {
                        return `<span style="width:80%" class="btn btn-bold btn-sm btn-font-sm btn-label-success">${data} Treatment</span>`;
                    }
                    else {
                        return data;
                    }
                },
            }, {
                field: 'aksi',
                title: 'Aksi',
                responsivePriority: -1,
                className: 'text-center',
                orderable: false,
                width: 100,
                render: function(data, type, full, meta) {
                    return `
                    <a href="user_supervisor_studio/customer_detail.html" class="btn btn-sm btn-brand" style="color:white;border-radius:2rem"><i class="fa fa-info-circle"></i> Rincian</a>`;
                },
            }, ],
            columnDefs: [{
                targets: [0, 1, 2, 3, 4, 5, 6],
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

    var initTableCustomerDetail = function() {
        // begin first table
        var table = $('#table_customer_detail').DataTable({
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
                url: 'source/supervisor_studio/customer_detail_treatment.json',
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
                data: 'waktu_mulai',
                title: 'Waktu Mulai',
            }, {
                data: 'treatment',
                title: 'Treatment',
            }, {
                data: 'therapist',
                title: 'Therapist',
                render: function(data, type, full, meta) {
                    return `<a href="user_supervisor_studio/karyawan_detail.html">`+ data +`</a>`;
                }
            }, {
                data: 'complaint',
                title: 'Complaint',
                render: function(data, type, row, meta) {
                    if (data == 'Ada') {
                        return `<span class="kt-font-danger">${data}</span>`;
                    }
                    else {
                        return `<span class="kt-font-success">${data}</span>`
                    }
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
                    <a href="user_supervisor_studio/treatment_detail_paid.html" class="btn btn-sm btn-brand" style="color:white;border-radius:2rem"><i class="fa fa-info-circle"></i> Rincian</a>`;
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

        $('#datepicker_customer_detail').on('change', function(e) {
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

        $('#search_customer_detail').on('keyup', function() {
            table.search(this.value).draw();
        });

        $('#datepicker_customer_detail').datepicker({
            todayHighlight: true,
            language: 'id',
            rtl: KTUtil.isRTL(),
            todayBtn: "linked",
            clearBtn: true,
            templates: {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>',
            },
        })/*.datepicker("setDate", new Date());*/
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
                    <a href="user_supervisor_studio/profile_payroll_detail.html" class="btn btn-sm btn-brand" style="color:white;border-radius:2rem"><i class="fa fa-info-circle"></i> Rincian</a>`;
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
                data: 'nama_pinjaman',
                title: 'Nama Pinjaman'
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
            dom: `<'row'<'col-sm-12 col-md-6 dataTables_info'<'total'>><'col-sm-12 col-md-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
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
                data: 'nama_pinjaman',
                title: 'Nama Pinjaman'
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

        $("div.total").html('<h5>Total Pinjaman : <span class="color-main-dark" name="pembayaran_nominal">Rp. 300.000,00</span></h5>');
    };

    var initTablePengeluaran = function() {
        // begin first table
        var table = $('#table_finance_pengeluaran').DataTable({
            order: [],
            responsive: true,
            buttons: [
                'print',
                'excelHtml5',
            ],
            // Pagination settings
            dom: `<'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-3'i><'col-sm-12 col-md-6 text-center dataTables_pager'lp><'col-sm-12 col-md-3 text-right'B>>`,
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
                url: 'source/admin/pengeluaran.json',
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
                data: 'no_pengeluaran',
                title: 'No Pengeluaran',
            }, {
                data: 'kategori',
                title: 'Kategori',
            }, {
                data: 'deskripsi',
                title: 'Deskripsi',
            }, {
                data: 'nominal',
                title: 'Nominal',
            }, {
                data: 'penerima',
                title: 'Penerima',
            },/*, {
                data: 'user',
                title: 'User',
                render: function(data, type, row, meta) {
                    var user = {
                        admin: {
                            'title': 'Admin',
                            'class': 'btn-label-danger'
                        },
                        gudang: {
                            'title': 'Gudang',
                            'class': 'btn-label-success'
                        },
                    };
                    if (typeof user[data] === 'undefined') {
                        return data;
                    }
                    return '<span style="width:100%" class="btn btn-bold btn-sm btn-font-sm ' + user[data].class + '">' + user[data].title + '</span>';
                }
            },*/ {
                field: 'aksi',
                title: 'Aksi',
                responsivePriority: -1,
                className: 'text-center',
                orderable: false,
                width: 100,
                render: function(data, type, full, meta) {
                    return `
                    <a href="user_supervisor_studio/finance_pengeluaran_detail.html" class="btn btn-sm btn-brand" style="color:white;border-radius:2rem"><i class="fa fa-info-circle"></i> Rincian</a>`;
                },
            }],
            columnDefs: [{
                targets: [0, 1, 2, 3, 4, 5, 6, 7],  //sisa ditambah 8
                className: 'text-center',
                orderable: true,
            }],
        });

        $('#export_print').on('click', function(e) {
            e.preventDefault();
            table.button(0).trigger();
        });

        $('#export_excel').on('click', function(e) {
            e.preventDefault();
            table.button(2).trigger();
        });


        table.on('order.dt search.dt', function() {
            table.column(0, {
                search: 'applied',
                order: 'applied'
            }).nodes().each(function(cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();

        $('#datepicker_finance_pengeluaran').on('change', function(e) {
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

        $('#search_finance_pengeluaran').on('keyup', function() {
            table.search(this.value).draw();
        });

        $('#datepicker_finance_pengeluaran').datepicker({
            todayHighlight: true,
            language: 'id',
            rtl: KTUtil.isRTL(),
            todayBtn: "linked",
            clearBtn: true,
            templates: {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>',
            },
        })/*.datepicker("setDate", new Date());*/
    };

    var initTablePemasukan = function() {
        // begin first table
        var table = $('#table_finance_pemasukan').DataTable({
            order: [],
            responsive: true,
            buttons: [
                'print',
                'excelHtml5',
            ],
            // Pagination settings
            dom: `<'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-3'i><'col-sm-12 col-md-6 text-center dataTables_pager'lp><'col-sm-12 col-md-3 text-right'B>>`,
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
                url: 'source/admin/pemasukan.json',
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
                title: 'No Pesanan',
            }, {
                data: 'tipe_pembayaran',
                title: 'Tipe Pembayaran',
            }, {
                data: 'treatment',
                title: 'Treatment',
            }, {
                data: 'nominal',
                title: 'Nominal',
            }, {
                field: 'aksi',
                title: 'Aksi',
                responsivePriority: -1,
                className: 'text-center',
                orderable: false,
                width: 100,
                render: function(data, type, full, meta) {
                    return `
                    <a href="user_supervisor_studio/treatment_detail_paid.html" class="btn btn-sm btn-brand" style="color:white;border-radius:2rem"><i class="fa fa-info-circle"></i> Rincian</a>`;
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

        $('#datepicker_finance_pemasukan').on('change', function(e) {
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

        $('#search_finance_pemasukan').on('keyup', function() {
            table.search(this.value).draw();
        });

        $('#datepicker_finance_pemasukan').datepicker({
            todayHighlight: true,
            language: 'id',
            rtl: KTUtil.isRTL(),
            todayBtn: "linked",
            clearBtn: true,
            templates: {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>',
            },
        })/*.datepicker("setDate", new Date());*/
    };

    var initTablePengeluaranDetail = function() {
        var table = $('#table_pengeluaran_detail');
        // begin first table
        table.DataTable({
            order: [],
            info: false,
            paging: false,
            lengthChange: false,
            searching: false,
            responsive: true,
            ajax: {
                url: 'source/admin/pengeluaran_detail.json',
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
                data: 'nama_pengeluaran',
                title: 'Pengeluaran'
            }, {
                data: 'quantity',
                title: 'Quantity'
            }, {
                data: 'harga',
                title: 'Harga'
            }, ],
            columnDefs: [{
                targets: [0, 1, 2, 3],
                className: 'text-center',
                orderable: false,
            }],
        });
    };

    var initTablePengeluaranDetailEdit = function () {
        var i = 0;
        var table = $('#table_pengeluaran_detail_edit');
        // begin first table
        table.DataTable({
            order: [],
            info: false,
            paging: false,
            lengthChange: false,
            searching: false,
            responsive: true,
            ajax: {
                url: 'source/admin/pengeluaran_detail.json',
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
                data: 'nama_pengeluaran',
                title: 'Pengeluaran',
                render: function(data, type, full, meta) {
                    i++;
                    return `<input name="pengeluaran_nama`+ i +`" type="text" class="form-control request_required" placeholder="Nama Pengeluaran" value="`+ data +`">`;
                }
            }, {
                data: 'quantity',
                title: 'Quantity',
                render: function(data, type, full, meta) {
                    return `<input name="pengeluaran_quantity`+ i +`" type="number" min="1" class="form-control request_required" placeholder="Jumlah" value="`+ data +`">`;
                }
            }, {
                data: 'harga',
                title: 'Harga',
                render: function(data, type, full, meta) {
                    return `<input name="pengeluaran_harga`+ i +`" type="text" class="form-control request_required" placeholder="Harga" value="`+ data +`">`;
                }
            }, ],
            columnDefs: [{
                targets: [0, 1, 2, 3],
                className: 'text-center',
                orderable: false,
            }],
        });
    };

    return {
        //main function to initiate the module
        init: function() {
            initTableActiveTreatment();
            initTableTreatmentDetail();
            initTablePaidTreatment();
            initTableVoidTreatment();
            initTableSPKScheduled();
            initTableSPKWaiting();
            initTableSPKOngoing();
            initTableSPKDone();
            initTableSPKPaid();
            initTableInvoice();
            initTableStock();
            initTableStockDetailIn();
            initTableStockDetailOut();
            initTableRequestIn();
            initTableRequestOut();
            initTableKehadiran();
            initTableKehadiranDayOff();
            initTableKaryawanKehadiran();
            initTableKaryawanList();
            initTableKaryawanTreatment();
            initTableKaryawanComplaint();
            initTableKaryawanKehadiranDetail();
            initTableKaryawanInventory();
            initTableKaryawanInventoryPenggunaan();
            initTableKaryawanInventoryRequest();
            initTableRequestInDetailRequest();
            initTableRequestInDetailDisetujui();
            initTableRequestOutDetailRequest();
            initTableRequestOutDetailTerkirim();
            initTableRequestOutDetailDiterima();
            initTableCustomer();
            initTableCustomerDetail();
            initTablePayroll();
            initTablePinjamanListRequest();
            initTablePinjamanCurrent();
            initTablePengeluaran();
            initTablePemasukan();
            initTablePengeluaranDetail();
            initTablePengeluaranDetailEdit();
        },
    };
}();


jQuery(document).ready(function() {
    KTDatatablesSearchOptionsAdvancedSearch.init();
});
