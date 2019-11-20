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

    return {
        //main function to initiate the module
        init: function() {
            initTableMasterData();
            initTableStock();
            initTableStockDetail();
        },
    };

}();
// end: Inventory


jQuery(document).ready(function() {
    KTDatatablesSearchOptionsAdvancedSearch.init();
});
