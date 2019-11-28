"use strict";

// begin: Inventory
var KTDatatablesSearchOptionsAdvancedSearch = function() {

    $.fn.dataTable.Api.register('column().title()', function() {
        return $(this.header()).text().trim();
    });

    var initTableMasterData = function() {
        var table = $('#table_master_data');
        // begin first table
        table.DataTable({
            responsive: true,
            ajax: {
                url: 'source/inventory/inventory.json',
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
                width: 25,
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
                width: 200,
                render: function(data, type, full, meta) {
                    return `
                    <button class="btn btn-sm btn-success" style="color:white;border-radius:15px" data-toggle="modal" data-target="#kt_modal_edit_barang">Edit</button>&nbsp;<button class="btn btn-sm btn-danger" onClick="swalHapus();" style="color:white;border-radius:15px">Delete</button>`;
                },
            }],
            columnDefs: [{
                targets: [0, 1, 2, 3, 4],
                className: 'text-center',
                orderable: true,
            }],
        });
    };

    var initTableStock = function() {
        var table = $('#table_stock');
        // begin first table
        table.DataTable({
            responsive: true,
            ajax: {
                url: 'source/inventory/inventory.json',
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
                width: 25,
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
                width: 200,
                render: function(data, type, full, meta) {
                    return `
                    <button class="btn btn-sm btn-warning" style="border-radius:15px">Tambah</button>&nbsp;<a href="user_inventory/stock_detail.html" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
                },
            }],
            columnDefs: [{
                targets: [0, 1, 2, 3, 4],
                className: 'text-center',
                orderable: true,
            }],
        });
    };

    var initTableStockDetail = function() {
        var table = $('#table_stock_detail');
        // begin first table
        table.DataTable({
            responsive: true,
            ajax: {
                url: 'source/inventory/stock_detail.json',
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
                width: 25,
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
            }, {
                field: 'aksi',
                title: 'Aksi',
                responsivePriority: -1,
                className: 'text-center',
                orderable: false,
                width: 100,
                render: function(data, type, full, meta) {
                    return `
                    <button class="btn btn-sm btn-danger" onClick="swalVoid();" style="color:white;border-radius:15px">Void</button>`;
                },
            }, ],
            columnDefs: [{
                targets: [0, 1, 2, 3, 4],
                className: 'text-center',
                orderable: true,
            }],
        });
    };

    var initTableRequestIn = function() {
        // begin first table
        var table = $('#table_request_in').DataTable({
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
                url: 'source/inventory/request_in.json',
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
                width: 25,
                orderable: false,
            }, {
                data: 'tanggal',
                title: 'Tanggal',
            }, {
                data: 'kode_request',
                title: 'Kode Request',
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
                    <a href="user_inventory/${status[full.status].href}" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
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
    };

    var initTableRequestOut = function() {
        // begin first table
        var table = $('#table_request_out').DataTable({
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
                url: 'source/inventory/request_out.json',
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
                width: 25,
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
                    <a href="user_inventory/${status[full.status].href}" class="btn btn-sm btn-brand" style="color:white;border-radius:15px">Rincian</a>`;
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
    };

    return {
        //main function to initiate the module
        init: function() {
            initTableMasterData();
            initTableStock();
            initTableStockDetail();
            initTableRequestIn();
            initTableRequestOut();
        },
    };

}();
// end: Inventory


jQuery(document).ready(function() {
    KTDatatablesSearchOptionsAdvancedSearch.init();
});
