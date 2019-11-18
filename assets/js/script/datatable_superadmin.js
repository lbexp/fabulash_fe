"use strict";

// begin: Admin Page
var KTDatatablesSearchOptionsAdvancedSearch = function() {

    $.fn.dataTable.Api.register('column().title()', function() {
        return $(this.header()).text().trim();
    });

    var initTableActiveTreatment = function() {
        // begin first table
        var table = $('#table_treatment_active').DataTable({
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
                url: 'source/treatment.json',
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
                // title: 'No.',
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
                        unpaid: {
                            'title': 'Unpaid',
                            'class': 'btn-label-danger'
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
                        scheduled: {'href': 'listTreatment_detail_scheduled.html'},
                        waiting: {'href': 'listTreatment_detail_unpaid.html'},
                        ongoing : {'href': 'listTreatment_detail_unpaid.html'},
                        unpaid : {'href': 'listTreatment_detail_unpaid.html'},
                        done : {'href': 'listTreatment_detail_paid.html'}
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
        var filter = function() {
            var val = $.fn.dataTable.util.escapeRegex($(this).val());
            table.column($(this).data('col-index')).search(val ? val : '', false, false).draw();
        };
        var asdasd = function(value, index) {
            var val = $.fn.dataTable.util.escapeRegex(value);
            table.column(index).search(val ? val : '', false, true);
        };
        $('#kt_search_waktu').on('change', function(e) {
            e.preventDefault();
            var params = {};
            $('.kt-input').each(function() {
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
        $('#kt_search_all').on('keyup', function() {
            table.search(this.value).draw();
        });
        $('#kt_reset').on('click', function(e) {
            e.preventDefault();
            $('.kt-input').each(function() {
                $(this).val('');
                table.column($(this).data('col-index')).search('', false, false);
            });
            table.table().draw();
        });
    };

    var initTableAllTreatment = function() {
        // begin first table
        var table = $('#table_treatment_all').DataTable({
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
                url: 'source/treatment.json',
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
                // title: 'No.',
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
                    <a href="user_superadmin/listTreatment_detail_paid.html" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
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
        var filter = function() {
            var val = $.fn.dataTable.util.escapeRegex($(this).val());
            table.column($(this).data('col-index')).search(val ? val : '', false, false).draw();
        };
        var asdasd = function(value, index) {
            var val = $.fn.dataTable.util.escapeRegex(value);
            table.column(index).search(val ? val : '', false, true);
        };
        $('#kt_search_waktu').on('change', function(e) {
            e.preventDefault();
            var params = {};
            $('.kt-input').each(function() {
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
        $('#kt_search_all').on('keyup', function() {
            table.search(this.value).draw();
        });
        $('#kt_reset').on('click', function(e) {
            e.preventDefault();
            $('.kt-input').each(function() {
                $(this).val('');
                table.column($(this).data('col-index')).search('', false, false);
            });
            table.table().draw();
        });
    };

    var initTableVoidTreatment = function() {
        // begin first table
        var table = $('#table_treatment_void').DataTable({
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
                url: 'source/treatment.json',
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
                // title: 'No.',
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
                    <a href="user_superadmin/listTreatment_detail_paid.html" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
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
        var filter = function() {
            var val = $.fn.dataTable.util.escapeRegex($(this).val());
            table.column($(this).data('col-index')).search(val ? val : '', false, false).draw();
        };
        var asdasd = function(value, index) {
            var val = $.fn.dataTable.util.escapeRegex(value);
            table.column(index).search(val ? val : '', false, true);
        };
        $('#kt_search_waktu').on('change', function(e) {
            e.preventDefault();
            var params = {};
            $('.kt-input').each(function() {
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
        $('#kt_search_all').on('keyup', function() {
            table.search(this.value).draw();
        });
        $('#kt_reset').on('click', function(e) {
            e.preventDefault();
            $('.kt-input').each(function() {
                $(this).val('');
                table.column($(this).data('col-index')).search('', false, false);
            });
            table.table().draw();
        });
    };

    var initTableTreatmentDetail = function() {
        var table = $('#table_treatment_detail');
        // begin first table
        table.DataTable({
            info: false,
            paging: false,
            lengthChange: false,
            searching: false,
            responsive: true,
            ajax: {
                url: 'source/treatment_list.json',
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
                // title: 'No.',
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
                orderable: true,
            }],
        });
    };

    var initTablePengeluaran = function() {
        // begin first table
        var table = $('#table_finance_pengeluaran').DataTable({
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
                // title: 'No.',
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
                        inventory: {
                            'title': 'Inventory',
                            'class': 'btn-label-success'
                        },
                        superadmin: {
                            'title': 'Superadmin',
                            'class': 'btn-label-brand'
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
        var filter = function() {
            var val = $.fn.dataTable.util.escapeRegex($(this).val());
            table.column($(this).data('col-index')).search(val ? val : '', false, false).draw();
        };
        var asdasd = function(value, index) {
            var val = $.fn.dataTable.util.escapeRegex(value);
            table.column(index).search(val ? val : '', false, true);
        };
        $('#kt_search_waktu').on('change', function(e) {
            e.preventDefault();
            var params = {};
            $('.kt-input').each(function() {
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
        $('#kt_search_all').on('keyup', function() {
            table.search(this.value).draw();
        });
        $('#kt_reset').on('click', function(e) {
            e.preventDefault();
            $('.kt-input').each(function() {
                $(this).val('');
                table.column($(this).data('col-index')).search('', false, false);
            });
            table.table().draw();
        });
    };

    var initTablePemasukan = function() {
        // begin first table
        var table = $('#table_finance_pemasukan').DataTable({
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
                url: 'source/pemasukan.json',
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
                // title: 'No.',
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
                    <a href="user_superadmin/finance_pengeluaran_detail.html" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
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
        var filter = function() {
            var val = $.fn.dataTable.util.escapeRegex($(this).val());
            table.column($(this).data('col-index')).search(val ? val : '', false, false).draw();
        };
        var asdasd = function(value, index) {
            var val = $.fn.dataTable.util.escapeRegex(value);
            table.column(index).search(val ? val : '', false, true);
        };
        $('#kt_search_waktu').on('change', function(e) {
            e.preventDefault();
            var params = {};
            $('.kt-input').each(function() {
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
        $('#kt_search_all').on('keyup', function() {
            table.search(this.value).draw();
        });
        $('#kt_reset').on('click', function(e) {
            e.preventDefault();
            $('.kt-input').each(function() {
                $(this).val('');
                table.column($(this).data('col-index')).search('', false, false);
            });
            table.table().draw();
        });
    };

    return {
        //main function to initiate the module
        init: function() {
            initTableActiveTreatment();
            initTableAllTreatment();
            initTableVoidTreatment();
            initTableTreatmentDetail();
            initTablePengeluaran();
            initTablePemasukan();
        },
    };

}();


jQuery(document).ready(function() {
    KTDatatablesSearchOptionsAdvancedSearch.init();
});
