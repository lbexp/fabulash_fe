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
        }).datepicker("setDate", new Date());
    };

    var initTableAllTreatment = function() {
        // begin first table
        var table = $('#table_treatment_all').DataTable({
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
            }, {
                data: 'therapist',
                title: 'Therapist',
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
        }).datepicker("setDate", new Date());
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

    // var initTablePengeluaran = function() {
    //     // begin first table
    //     var table = $('#table_finance_pengeluaran').DataTable({
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
    //             url: 'source/superadmin/pengeluaran.json',
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
    //             title: 'Tanggal',
    //         }, {
    //             data: 'no_pengeluaran',
    //             title: 'No Pengeluaran',
    //         }, {
    //             data: 'kategori',
    //             title: 'Kategori',
    //         }, {
    //             data: 'deskripsi',
    //             title: 'Deskripsi',
    //         }, {
    //             data: 'nominal',
    //             title: 'Nominal',
    //         }, {
    //             data: 'penerima',
    //             title: 'Penerima',
    //         }, {
    //             data: 'user',
    //             title: 'User',
    //             render: function(data, type, row, meta) {
    //                 var user = {
    //                     admin: {
    //                         'title': 'Admin',
    //                         'class': 'btn-label-danger'
    //                     },
    //                     inventory: {
    //                         'title': 'Inventory',
    //                         'class': 'btn-label-success'
    //                     },
    //                     superadmin: {
    //                         'title': 'Superadmin',
    //                         'class': 'btn-label-brand'
    //                     },
    //                 };
    //                 if (typeof user[data] === 'undefined') {
    //                     return data;
    //                 }
    //                 return '<span style="width:100%" class="btn btn-bold btn-sm btn-font-sm ' + user[data].class + '">' + user[data].title + '</span>';
    //             }
    //         }, {
    //             field: 'aksi',
    //             title: 'Aksi',
    //             responsivePriority: -1,
    //             className: 'text-center',
    //             orderable: false,
    //             width: 100,
    //             render: function(data, type, full, meta) {
    //                 return `
    //                 <a href="user_superadmin/finance_pengeluaran_detail.html" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
    //             },
    //         }],
    //         columnDefs: [{
    //             targets: [0, 1, 2, 3, 4, 5, 6, 7, 8],
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

    // var initTablePengeluaranDetail = function() {
    //     var table = $('#table_pengeluaran_detail');
    //     // begin first table
    //     table.DataTable({
    //         order: [],
    //         info: false,
    //         paging: false,
    //         lengthChange: false,
    //         searching: false,
    //         responsive: true,
    //         ajax: {
    //             url: 'source/admin/pengeluaran_detail.json',
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
    //             data: 'nama_pengeluaran',
    //             title: 'Pengeluaran'
    //         }, {
    //             data: 'quantity',
    //             title: 'Quantity'
    //         }, {
    //             data: 'harga',
    //             title: 'Harga'
    //         }, ],
    //         columnDefs: [{
    //             targets: [0, 1, 2, 3],
    //             className: 'text-center',
    //             orderable: true,
    //         }],
    //     });
    // };

    // var initTablePemasukan = function() {
    //     // begin first table
    //     var table = $('#table_finance_pemasukan').DataTable({
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
    //             url: 'source/superadmin/pemasukan.json',
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
    //             title: 'Tanggal',
    //         }, {
    //             data: 'no_pesanan',
    //             title: 'No Pesanan',
    //         }, {
    //             data: 'tipe_pembayaran',
    //             title: 'Tipe Pembayaran',
    //         }, {
    //             data: 'treatment',
    //             title: 'Treatment',
    //         }, {
    //             data: 'nominal',
    //             title: 'Nominal',
    //         }, {
    //             field: 'aksi',
    //             title: 'Aksi',
    //             responsivePriority: -1,
    //             className: 'text-center',
    //             orderable: false,
    //             width: 100,
    //             render: function(data, type, full, meta) {
    //                 return `
    //                 <a href="user_superadmin/finance_pemasukan_detail.html" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
    //             },
    //         }],
    //         columnDefs: [{
    //             targets: [0, 1, 2, 3, 4, 5, 6],
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
                data: 'tipe',
                title: 'Tipe'
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
                    <a href="user_superadmin/#.html" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
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
                width: 100,
                render: function(data, type, full, meta) {
                    return `
                    <a href="#.html" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
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
                title: 'Customer'
            }, {
                data: 'therapist',
                title: 'Therapist'
            }, {
                field: 'aksi',
                title: 'Aksi',
                responsivePriority: -1,
                className: 'text-center',
                orderable: false,
                width: 100,
                render: function(data, type, full, meta) {
                    return `
                    <a href="#" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
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
        }).datepicker("setDate", new Date());
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
            }, {
                field: 'aksi',
                title: 'Aksi',
                responsivePriority: -1,
                className: 'text-center',
                orderable: false,
                width: 100,
                render: function(data, type, full, meta) {
                    return `
                    <a href="#" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
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
        }).datepicker("setDate", new Date());
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
        }).datepicker("setDate", new Date());
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
        }).datepicker("setDate", new Date());
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
					<button onClick="swalApprove();" class="dropdown-item btn btn-secondary kt-margin-b-5"> <i class="fa fa-check"></i> Approve</button>
					<button onClick="swalReject();" class="dropdown-item btn btn-secondary"> <i class="fa fa-times"></i> Reject</button>
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
        }).datepicker("setDate", new Date());
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
					<button onClick="swalApprove();" class="dropdown-item btn btn-secondary kt-margin-b-5"> <i class="fa fa-check"></i> Approve</button>
					<button onClick="swalReject();" class="dropdown-item btn btn-secondary"> <i class="fa fa-times"></i> Reject</button>
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
        }).datepicker("setDate", new Date());
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

    return {
        //main function to initiate the module
        init: function() {
            initTableActiveTreatment();
            initTableAllTreatment();
            initTableVoidTreatment();
            initTableTreatmentDetail();
            // initTablePengeluaran();
            // initTablePengeluaranDetail();
            // initTablePemasukan();
            initTableDataTreatment();
            initTableDataComplaint();
            initTableKaryawan();
            initTableKaryawanTreatment();
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
        },
    };
}();


jQuery(document).ready(function() {
    KTDatatablesSearchOptionsAdvancedSearch.init();
});
