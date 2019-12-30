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
                url: 'source/superadmin/treatment.json',
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
                    return `<a href="user_superadmin/customer_detail.html">`+ data +`</a>`;
                }
            }, {
                data: 'therapist',
                title: 'Therapist',
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
                    <a href="user_superadmin/${status[full.status].href}" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
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
                url: 'source/superadmin/treatment.json',
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
                    return `<a href="user_superadmin/customer_detail.html">`+ data +`</a>`;
                }
            }, {
                data: 'therapist',
                title: 'Therapist',
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
                    <a href="user_superadmin/treatment_detail_paid.html" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
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
                url: 'source/superadmin/treatment.json',
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
                data: 'no_pesanan',
                title: 'No Pesanan',
            }, {
                data: 'treatment',
                title: 'Treatment',
            }, {
                data: 'customer',
                title: 'Customer',
                render: function(data, type, full, meta) {
                    return `<a href="user_superadmin/customer_detail.html">`+ data +`</a>`;
                }
            }, {
                data: 'therapist',
                title: 'Therapist',
            }, {
                data: 'void',
                title: 'Status',
                render: function(data, type, full, meta) {
                    var statusVoid = {
                        'Void' : {
                            'title' : 'Void',
                            'class' : 'btn-label-danger'
                        },
                        'Request Void' : {
                            'title' : 'Request Void',
                            'class' : 'btn-label-warning'
                        }
                    };
                    if (typeof statusVoid[data] === 'undefined') {
                        return data;
                    }
                    return '<span style="width:100%" class="btn btn-bold btn-sm btn-font-sm ' + statusVoid[data].class + '">' + statusVoid[data].title + '</span>';
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
                    <a href="user_superadmin/treatment_detail_paid.html" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
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
                url: 'source/superadmin/invoice.json',
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
                url: 'source/superadmin/spk.json',
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
                url: 'source/superadmin/spk.json',
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
                url: 'source/superadmin/spk.json',
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
                url: 'source/superadmin/spk.json',
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
                targets: [0, 1, 2, 3, 4],
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
                url: 'source/superadmin/spk.json',
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
                url: 'source/admin/invoice.json',
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
                title: 'Therapist'
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

    var initTableDataKategoriTreatment = function() {
        var table = $('#table_data_kategori_treatment');
        // begin first table
        var datatable = table.DataTable({
            order: [],
            info: true,
            paging: true,
            lengthChange: true,
            searching: true,
            responsive: true,
            ajax: {
                url: 'source/superadmin/data_treatment.json',
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
                field: 'aksi',
                title: 'Aksi',
                responsivePriority: -1,
                className: 'text-center',
                orderable: false,
                width: 175,
                render: function(data, type, full, meta) {
                    return `
                        <button type="button" class="btn btn-pill btn-sm btn-success" data-toggle="modal" data-target="#kt_modal_edit_kategori_treatment"><i class="fa fa-edit"></i> Edit</button>&nbsp;
                        <button type="button" class="btn btn-pill btn-sm btn-danger" onClick="swalDelete();"><i class="fa fa-trash-alt"></i> Delete</button>`;
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

    var initTableDataTreatment = function() {
        var table = $('#table_data_treatment');
        // begin first table
        var datatable = table.DataTable({
            order: [],
            info: true,
            paging: true,
            lengthChange: true,
            searching: true,
            responsive: true,
            ajax: {
                url: 'source/superadmin/data_treatment.json',
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
                data: 'kategori',
                title: 'Kategori'
            }, {
                data: 'harga',
                title: 'Harga'
            }, {
                field: 'aksi',
                title: 'Aksi',
                responsivePriority: -1,
                className: 'text-center',
                orderable: false,
                width: 175,
                render: function(data, type, full, meta) {
                    return `
                        <button type="button" class="btn btn-pill btn-sm btn-success" data-toggle="modal" data-target="#kt_modal_edit_treatment"><i class="fa fa-edit"></i> Edit</button>&nbsp;
                        <button type="button" class="btn btn-pill btn-sm btn-danger" onClick="swalDelete();"><i class="fa fa-trash-alt"></i> Delete</button>`;
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

    var initTableDataComplaint = function() {
        var table = $('#table_data_complaint');
        // begin first table
        var datatable = table.DataTable({
            order: [],
            info: true,
            paging: true,
            lengthChange: true,
            searching: true,
            responsive: true,
            ajax: {
                url: 'source/superadmin/data_complaint.json',
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
                data: 'complaint',
                title: 'Complaint'
            }, {
                data: 'tipe',
                title: 'Tipe'
            }, {
                field: 'aksi',
                title: 'Aksi',
                responsivePriority: -1,
                className: 'text-center',
                orderable: false,
                width: 175,
                render: function(data, type, full, meta) {
                    return `
                        <button type="button" class="btn btn-pill btn-sm btn-success" data-toggle="modal" data-target="#kt_modal_edit_complaint"><i class="fa fa-edit"></i> Edit</button>&nbsp;
                        <button type="button" class="btn btn-pill btn-sm btn-danger" onClick="swalDelete();"><i class="fa fa-trash-alt"></i> Delete</button>`;
                },
            }, ],
            columnDefs: [{
                targets: [0, 1, 2],
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

    var initTableDataKomisi = function() {
        var table = $('#table_data_komisi');
        // begin first table
        var datatable = table.DataTable({
            order: [],
            info: true,
            paging: true,
            lengthChange: true,
            searching: true,
            responsive: true,
            ajax: {
                url: 'source/superadmin/data_komisi.json',
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
                title: 'Jenis Komisi'
            }, {
                data: 'jumlah',
                title: 'Jumlah Komisi'
            }, {
                field: 'aksi',
                title: 'Aksi',
                responsivePriority: -1,
                className: 'text-center',
                orderable: false,
                width: 175,
                render: function(data, type, full, meta) {
                    return `
                        <button type="button" class="btn btn-pill btn-sm btn-success" data-toggle="modal" data-target="#kt_modal_edit_komisi"><i class="fa fa-edit"></i> Edit</button>&nbsp;
                        <button type="button" class="btn btn-pill btn-sm btn-danger" onClick="swalDelete();"><i class="fa fa-trash-alt"></i> Delete</button>`;
                },
            }, ],
            columnDefs: [{
                targets: [0, 1, 2],
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

    var initTableDataStudio = function() {
        var table = $('#table_data_studio');
        // begin first table
        var datatable = table.DataTable({
            order: [],
            info: true,
            paging: true,
            lengthChange: true,
            searching: true,
            responsive: true,
            ajax: {
                url: 'source/superadmin/data_studio.json',
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
                data: 'no_telepon',
                title: 'No. Telepon'
            }, {
                data: 'alamat',
                title: 'Alamat'
            }, {
                data: 'supervisor',
                title: 'Supervisor'
            }, {
                field: 'aksi',
                title: 'Aksi',
                responsivePriority: -1,
                className: 'text-center',
                orderable: false,
                width: 175,
                render: function(data, type, full, meta) {
                    return `
                        <button type="button" class="btn btn-pill btn-sm btn-success" data-toggle="modal" data-target="#kt_modal_edit_studio"><i class="fa fa-edit"></i> Edit</button>&nbsp;
                        <button type="button" class="btn btn-pill btn-sm btn-danger" onClick="swalDelete();"><i class="fa fa-trash-alt"></i> Delete</button>`;
                },
            }, ],
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

    var initTableKaryawan = function() {
        var table = $('#table_karyawan');
        // begin first table
        var datatable = table.DataTable({
            order: [],
            info: true,
            paging: true,
            lengthChange: true,
            searching: true,
            responsive: true,
            ajax: {
                url: 'source/superadmin/karyawan.json',
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
                data: 'jabatan',
                title: 'Jabatan'
            }, {
                data: 'tanggal_masuk',
                title: 'Tanggal Masuk'
            }, {
                field: 'aksi',
                title: 'Aksi',
                responsivePriority: -1,
                className: 'text-center',
                orderable: false,
                width: 100,
                render: function(data, type, full, meta) {
                    return `
                    <a href="user_superadmin/hr_karyawan_detail.html" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
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
                url: 'source/superadmin/treatment.json',
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
                title: 'No Pesanan'
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
                    return `<a href="user_superadmin/customer_detail.html">`+ data +`</a>`;
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
                url: 'source/superadmin/treatment.json',
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
                render: function(data, type, full, meta) {
                    return `<a href="user_superadmin/customer_detail.html">`+ data +`</a>`;
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

    var initTableKaryawanKehadiran = function() {
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
                url: 'source/superadmin/kehadiran.json',
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
                data: 'waktu_masuk',
                title: 'Waktu Masuk'
            }, {
                data: 'waktu_pulang',
                title: 'Waktu Pulang'
            }, {
                data: 'keterlambatan',
                title: 'Keterlambatan',
                render: function(data, type, full, meta) {
                    return data + ` Menit`;
                }
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

        $('#monthpicker_karyawan_kehadiran').on('change', function(e) {
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

        $('#monthpicker_karyawan_kehadiran').datepicker({
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

    var initTableKaryawanPayroll = function() {
        // begin first table
        var table = $('#table_karyawan_payroll').DataTable({
            order: [],
            responsive: true,
            info: false,
            paging: false,
            lengthChange: false,
            searching: false,
            language: {
                'lengthMenu': 'Display _MENU_',
            },
            searchDelay: 500,
            processing: true,
            serverSide: false,
            ajax: {
                url: 'source/superadmin/payroll.json',
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
                data: 'biaya',
                title: 'Biaya'
            }, {
                data: 'nilai',
                title: 'Nilai'
            }, {
                data: 'jumlah',
                title: 'Jumlah'
            }, {
                data: 'subtotal',
                title: 'Sub Total'
            }, {
                data: 'total',
                title: 'Total'
            }],
            columnDefs: [{
                targets: [0, 1, 2, 3, 4, 5],
                className: 'text-center',
                orderable: false,
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
    };

    // var initTablePembelian = function() {
    //     // begin first table
    //     var table = $('#table_pembelian').DataTable({
    //         order: [],
    //         responsive: true,
    //         // Pagination settings
    //         dom: `<'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
    //         // read more: https://datatables.net/examples/basic_init/dom.html
    //         lengthMenu: [5, 10, 25, 50],
    //         pageLength: 10,
    //         language: {
    //             'lengthMenu': 'Display _MENU_',
    //         },
    //         searchDelay: 500,
    //         processing: true,
    //         serverSide: false,
    //         ajax: {
    //             url: 'source/superadmin/pembelian.json',
    //             type: 'POST',
    //             data: {
    //                 // parameters for custom backend script demo
    //                 columnsDef: [
    //                     'no', 'depot', 'vendor', 'pekerjaan', 'sifat',
    //                     'tanggal', 'status', 'aksi',
    //                 ],
    //             },
    //         },
    //         columns: [{
    //             data: 'null',
    //             title: 'No',
    //             render: function(data, type, row, meta) {
    //                 return meta.row + meta.settings._iDisplayStart + 1;
    //             },
    //             width: 35,
    //             orderable: false,
    //         }, {
    //             data: 'tanggal',
    //             title: 'Tanggal'
    //         }, {
    //             data: 'barang',
    //             title: 'Nama Barang'
    //         }, {
    //             data: 'satuan',
    //             title: 'Satuan'
    //         }, {
    //             data: 'quantity',
    //             title: 'Jumlah'
    //         }, {
    //             data: 'harga',
    //             title: 'Harga'
    //         }],
    //         columnDefs: [{
    //             targets: [0, 1, 2, 3, 4, 5],
    //             className: 'text-center',
    //             orderable: true,
    //         }],
    //     });
    //
    //     table.on('order.dt search.dt', function() {
    //         table.column(0, {
    //             search: 'applied',
    //             order: 'applied'
    //         }).nodes().each(function(cell, i) {
    //             cell.innerHTML = i + 1;
    //         });
    //     }).draw();
    //
    //     $('#kt_search_waktu').on('change', function(e) {
    //         e.preventDefault();
    //         var params = {};
    //         var i = $(this).data('col-index');
    //         if (params[i]) {
    //             params[i] += '|' + $(this).val();
    //         } else {
    //             params[i] = $(this).val();
    //         }
    //         $.each(params, function(i, val) {
    //             // apply search params to datatable
    //             table.column(i).search(val ? val : '', false, false);
    //         });
    //         table.table().draw();
    //     });
    //
    //     $('#kt_search_all').on('keyup', function() {
    //         table.search(this.value).draw();
    //     });
    // };

    // var initTableStock = function() {
    //     var table = $('#table_stock');
    //     // begin first table
    //     var datatable = table.DataTable({
    //         order: [],
    //         responsive: true,
    //         ajax: {
    //             url: 'source/superadmin/stock.json',
    //             type: 'POST',
    //             data: {
    //                 pagination: {
    //                     perpage: 50,
    //                 },
    //             },
    //         },
    //         columns: [{
    //             data: 'null',
    //             title: 'No',
    //             render: function(data, type, row, meta) {
    //                 return meta.row + meta.settings._iDisplayStart + 1;
    //             },
    //             width: 35,
    //             orderable: false,
    //         }, {
    //             data: 'barang',
    //             title: 'Barang',
    //         }, {
    //             data: 'isi_satuan',
    //             title: 'Isi Per Satuan',
    //         }, {
    //             data: 'satuan',
    //             title: 'Satuan',
    //         }, {
    //             data: 'persediaan',
    //             title: 'Persediaan',
    //         },{
    //             field: 'aksi',
    //             title: 'Aksi',
    //             responsivePriority: -1,
    //             className: 'text-center',
    //             orderable: false,
    //             width: 100,
    //             render: function(data, type, full, meta) {
    //                 return `
    //                 <a href="user_superadmin/stock_detail.html" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
    //             },
    //         }],
    //         columnDefs: [{
    //             targets: [0, 1, 2, 3, 4],
    //             className: 'text-center',
    //             orderable: true,
    //         }],
    //     });
    //
    //     datatable.on('order.dt search.dt', function() {
    //         datatable.column(0, {
    //             search: 'applied',
    //             order: 'applied'
    //         }).nodes().each(function(cell, i) {
    //             cell.innerHTML = i + 1;
    //         });
    //     }).draw();
    // };

    // var initTableStockDetail = function() {
    //     var table = $('#table_stock_detail');
    //     // begin first table
    //     var datatable = table.DataTable({
    //         order: [],
    //         responsive: true,
    //         ajax: {
    //             url: 'source/superadmin/stock_detail.json',
    //             type: 'POST',
    //             data: {
    //                 pagination: {
    //                     perpage: 50,
    //                 },
    //             },
    //         },
    //         columns: [{
    //             data: 'null',
    //             title: 'No',
    //             render: function(data, type, row, meta) {
    //                 return meta.row + meta.settings._iDisplayStart + 1;
    //             },
    //             width: 35,
    //             orderable: false,
    //         }, {
    //             data: 'tanggal',
    //             title: 'Tanggal'
    //         }, {
    //             data: 'status',
    //             title: 'Status',
    //             render: function(data, type, row, meta) {
    //                 var status = {
    //                     "Stock Masuk": {
    //                         'title': 'Stock Masuk',
    //                         'class': 'kt-font-success'
    //                     },
    //                     "Stock Keluar": {
    //                         'title': 'Stock Keluar',
    //                         'class': 'kt-font-danger'
    //                     },
    //                 };
    //                 if (typeof status[data] === 'undefined') {
    //                     return data;
    //                 }
    //                 return '<span class="' + status[data].class + '">' + status[data].title + '</span>';
    //             },
    //         }, {
    //             data: 'quantity',
    //             title: 'Quantity'
    //         }, {
    //             data: 'harga',
    //             title: 'Harga'
    //         }, ],
    //         columnDefs: [{
    //             targets: [0, 1, 2, 3, 4],
    //             className: 'text-center',
    //             orderable: true,
    //         }],
    //     });
    //
    //     datatable.on('order.dt search.dt', function() {
    //         datatable.column(0, {
    //             search: 'applied',
    //             order: 'applied'
    //         }).nodes().each(function(cell, i) {
    //             cell.innerHTML = i + 1;
    //         });
    //     }).draw();
    // };

    var initTableKaryawanInventory = function () {
        var table = $('#table_karyawan_inventory_sisa');
        // begin first table
        var datatable = table.DataTable({
            order: [],
            responsive: true,
            ajax: {
                url: 'source/superadmin/karyawan_inventory.json',
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
                url: 'source/superadmin/karyawan_inventory_penggunaan.json',
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
                title: 'Kode SPK'
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
                url: 'source/superadmin/karyawan_inventory_penggunaan.json',
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
                title: 'Kode SPK'
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

    var initTableKaryawanRequestDayoff = function () {
        // begin first table
        var table = $('#table_karyawan_dayoff').DataTable({
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
                url: 'source/superadmin/karyawan_dayoff.json',
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
                data: 'karyawan',
                title: 'Karyawan'
            }, {
                data: 'dayoff',
                title: 'Day Off'
            }, {
                data: 'notes',
                title: 'Notes'
            }, {
                data: 'foto',
                title: 'Foto',
                render: function(data, type, row, meta) {
                    return `<button type="button" class="btn btn-link" style="padding:0px;" data-toggle="modal" data-target="#kt_modal_foto"><i class="flaticon2-photo-camera"></i>Foto</button>`;
                }
            }, {
                field: 'aksi',
                title: 'Aksi',
                responsivePriority: -1,
                className: 'text-center',
                orderable: false,
                width: 50,
                render: function(data, type, full, meta) {
                    return `
                    <button type="button" class="btn btn-clean btn-icon btn-sm btn-icon-md" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					<i class="flaticon-more"></i>
					</button>
					<div style="min-width:9rem;padding:5px;" class="dropdown-menu dropdown-menu-right">
					<button onClick="swalApprove();" class="dropdown-item btn btn-secondary kt-margin-b-5"> <i class="fa fa-check" style="width: 22px;"></i> Approve</button>
					<button onClick="swalReject();" class="dropdown-item btn btn-secondary"> <i class="fa fa-times" style="width: 22px;"></i> Reject</button>
                    </div>`;
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

        $('#datepicker_karyawan_dayoff').on('change', function(e) {
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

        $('#search_karyawan_dayoff').on('keyup', function() {
            table.search(this.value).draw();
        });

        $('#datepicker_karyawan_dayoff').datepicker({
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

    var initTableKaryawanRequestPinjaman = function () {
        // begin first table
        var table = $('#table_karyawan_pinjaman').DataTable({
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
                url: 'source/superadmin/karyawan_pinjaman.json',
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
                width: 50,
                render: function(data, type, full, meta) {
                    return `
                    <button type="button" class="btn btn-clean btn-icon btn-sm btn-icon-md" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					<i class="flaticon-more"></i>
					</button>
					<div style="min-width:9rem;padding:5px;" class="dropdown-menu dropdown-menu-right">
					<button onClick="swalApprove();" class="dropdown-item btn btn-secondary kt-margin-b-5"> <i class="fa fa-check" style="width: 22px;"></i> Approve</button>
					<button onClick="swalReject();" class="dropdown-item btn btn-secondary"> <i class="fa fa-times" style="width: 22px;"></i> Reject</button>
                    </div>`;
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

        $('#datepicker_karyawan_pinjaman').on('change', function(e) {
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

        $('#search_karyawan_pinjaman').on('keyup', function() {
            table.search(this.value).draw();
        });

        $('#datepicker_karyawan_pinjaman').datepicker({
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

    var initTableFinancePayroll = function () {
        var table = $('#table_finance_payroll');
        // begin first table
        var datatable = table.DataTable({
            order: [],
            responsive: true,
            ajax: {
                url: 'source/superadmin/finance_payroll.json',
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
                data: 'karyawan',
                title: 'Karyawan'
            }, {
                data: 'nominal',
                title: 'Nominal'
            }, {
                field: 'aksi',
                title: 'Aksi',
                responsivePriority: -1,
                className: 'text-center',
                orderable: false,
                width: 50,
                render: function(data, type, full, meta) {
                    return `
                    <a href="user_superadmin/finance_payroll_detail.html" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
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

    var initTableFinancePayrollDetail = function () {
        var i = 0;
        var table = $('#table_finance_payroll_detail');
        // begin first table
        table.DataTable({
            order: [],
            info: false,
            paging: false,
            lengthChange: false,
            searching: false,
            responsive: true,
            columns: [{
                field: 'tipe',
                title: 'Tipe'
            }, {
                field: 'keterangan',
                title: 'Keterangan'
            }, {
                field: 'nominal',
                title: 'Nominal'
            }, ],
            columnDefs: [{
                targets: [0, 1, 2],
                className: 'text-center',
                orderable: false,
            }],
        });
    };

    var initTableFinancePinjaman = function () {
        var table = $('#table_finance_pinjaman');
        // begin first table
        var datatable = table.DataTable({
            order: [],
            responsive: true,
            ajax: {
                url: 'source/superadmin/finance_pinjaman.json',
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
                data: 'karyawan',
                title: 'Karyawan'
            }, {
                data: 'nominal',
                title: 'Nominal'
            }, {
                data: 'termin',
                title: 'Termin Pembayaran'
            }, {
                data: 'tanggal_approved',
                title: 'Tanggal Approved'
            }, {
                field: 'aksi',
                title: 'Aksi',
                responsivePriority: -1,
                className: 'text-center',
                orderable: false,
                width: 75,
                render: function(data, type, full, meta) {
                    return `
                    <button type="button" class="btn btn-sm btn-success" style="border-radius:15px" onClick="swalLunas();">Lunas</button>`;
                },
            }],
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
                url: 'source/superadmin/pengeluaran.json',
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
            }, {
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
            }, {
                field: 'aksi',
                title: 'Aksi',
                responsivePriority: -1,
                className: 'text-center',
                orderable: false,
                width: 100,
                render: function(data, type, full, meta) {
                    return `
                    <a href="user_superadmin/finance_pengeluaran_detail.html" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
                },
            }],
            columnDefs: [{
                targets: [0, 1, 2, 3, 4, 5, 6, 7, 8],
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
                url: 'source/superadmin/pemasukan.json',
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
                    <a href="user_superadmin/treatment_detail_paid.html" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
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
                url: 'source/superadmin/pengeluaran_detail.json',
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

    var initTableCustomer = function() {
        var table = $('#table_customer');
        // begin first table
        var datatable = table.DataTable({
            order: [],
            responsive: true,
            ajax: {
                url: 'source/superadmin/customer.json',
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
                    <a href="user_superadmin/customer_detail.html" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
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
                url: 'source/superadmin/customer_detail_treatment.json',
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
                    <a href="user_superadmin/treatment_detail_paid.html" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
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

    var initTableInventoryGudang = function () {
        var table = $('#table_inventory_gudang');
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
                field: 'aksi',
                title: 'Aksi',
                responsivePriority: -1,
                className: 'text-center',
                orderable: false,
                width: 100,
                render: function(data, type, full, meta) {
                    return `
                    <a href="user_superadmin/inventory_gudang_detail.html" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
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

    var initTableInventoryGudangKeluar = function() {
        // begin first table
        var table = $('#table_inventory_gudang_keluar').DataTable({
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

        $('#datepicker_inventory_gudang_keluar').on('change', function(e) {
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

        $('#search_inventory_gudang_keluar').on('keyup', function() {
            table.search(this.value).draw();
        });

        $('#datepicker_inventory_gudang_keluar').datepicker({
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

    var initTableInventoryGudangMasuk = function() {
        // begin first table
        var table = $('#table_inventory_gudang_masuk').DataTable({
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

        $('#datepicker_inventory_gudang_masuk').on('change', function(e) {
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

        $('#search_inventory_gudang_masuk').on('keyup', function() {
            table.search(this.value).draw();
        });

        $('#datepicker_inventory_gudang_masuk').datepicker({
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

    var initTableInventoryStudio = function () {
        var table = $('#table_inventory_studio');
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
                    <a href="user_superadmin/inventory_studio_detail.html" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
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

    var initTableInventoryStudioDetail = function () {
        // begin first table
        var table = $('#table_inventory_studio_detail').DataTable({
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
                data: 'status',
                title: 'Status',
                render: function(data, type, row, meta) {
                    var status = {
                        "Stock Masuk": {
                            'title': 'Stock Masuk',
                            'class': 'kt-font-success'
                        },
                        "Stock Keluar": {
                            'title': 'Stock Keluar',
                            'class': 'kt-font-danger'
                        },
                    };
                    if (typeof status[data] === 'undefined') {
                        return data;
                    }
                    return '<span class="' + status[data].class + '">' + status[data].title + '</span>';
                },
            }, {
                data: 'quantity',
                title: 'Quantity'
            }, {
                data: 'harga',
                title: 'Harga'
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

        $('#monthpicker_inventory_studio_detail').on('change', function(e) {
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

        $('#search_inventory_studio_detail').on('keyup', function() {
            table.search(this.value).draw();
        });

        $('#monthpicker_inventory_studio_detail').datepicker({
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

    var initTableInventoryTherapist = function () {
        var table = $('#table_inventory_therapist');
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

    return {
        //main function to initiate the module
        init: function() {
            initTableActiveTreatment();
            initTablePaidTreatment();
            initTableVoidTreatment();
            initTableTreatmentDetail();
            initTableSPKScheduled();
            initTableSPKWaiting();
            initTableSPKOngoing();
            initTableSPKDone();
            initTableSPKPaid();
            initTableInvoice();
            initTableDataKategoriTreatment();
            initTableDataTreatment();
            initTableDataComplaint();
            initTableDataKomisi();
            initTableDataStudio();
            initTableKaryawan();
            initTableKaryawanTreatment();
            initTableKaryawanComplaint();
            initTableKaryawanKehadiran();
            initTableKaryawanPayroll();
            // initTablePembelian();
            // initTableStock();
            // initTableStockDetail();
            initTableKaryawanInventory();
            initTableKaryawanInventoryPenggunaan();
            initTableKaryawanInventoryRequest();
            initTableKaryawanRequestDayoff();
            initTableKaryawanRequestPinjaman();
            initTableFinancePayroll();
            initTableFinancePayrollDetail();
            initTableFinancePinjaman();
            initTablePemasukan();
            initTablePengeluaran();
            initTablePengeluaranDetail();
            initTableCustomer();
            initTableCustomerDetail();
            initTableInventoryGudang();
            initTableInventoryGudangKeluar();
            initTableInventoryGudangMasuk();
            initTableInventoryStudio();
            initTableInventoryStudioDetail();
            initTableInventoryTherapist();
        },
    };
}();


jQuery(document).ready(function() {
    KTDatatablesSearchOptionsAdvancedSearch.init();
});
