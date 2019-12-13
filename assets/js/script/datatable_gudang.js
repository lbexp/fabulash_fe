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
                data: 'satuan_besar',
                title: 'Satuan Besar'
            }, {
                data: 'satuan_kecil',
                title: 'Satuan Kecil'
            }, {
                data: 'jumlah_satuan_kecil_per_besar',
                title: 'Jumlah Satuan Kecil Per Satuan Besar'
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
                targets: [0, 1, 2, 3, 4, 5],
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

    var initTablePembelian = function() {
        // begin first table
        var table = $('#table_pembelian').DataTable({
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
                url: 'source/gudang/pembelian.json',
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
                data: 'barang',
                title: 'Nama Barang'
            }, {
                data: 'satuan',
                title: 'Satuan'
            }, {
                data: 'quantity',
                title: 'Jumlah'
            }, {
                data: 'harga',
                title: 'Harga'
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

    var initTableStockDetail = function() {
        var table = $('#table_stock_detail');
        // begin first table
        var datatable = table.DataTable({
            order: [],
            responsive: true,
            ajax: {
                url: 'source/gudang/stock_detail.json',
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

    return {
        //main function to initiate the module
        init: function() {
            initTableDataBarang();
            initTableStock();
            initTableStockBarangKeluar();
            initTableStockBarangMasuk();

            initTableRequest();
            initTablePembelian();
            initTableStockDetail();
        },
    };
}();


jQuery(document).ready(function() {
    KTDatatablesSearchOptionsAdvancedSearch.init();
});
