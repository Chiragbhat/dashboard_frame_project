import React, {useMemo, useState, useEffect } from "react";
import { useTable, useSortBy , usePagination, useGlobalFilter } from "react-table";
import DATA from "../../../assets/DemoData.json";


const DashboardPage = ({ globalFilter }) => {

    const COLUMNS = [
        { 
            Header: 'User ID',
            accessor: 'id'
        },
        {
            Header: 'Name',
            accessor: 'name'
        },
        {
            Header: 'Company Name',
            accessor: 'company_name'
        },
        {
            Header: 'Email ID',
            accessor: 'email_id'
        },
        {
            Header: 'Role',
            accessor: 'role'
        },
        {
            Header: 'Last Login',
            accessor: 'last_login'
        },
        {
            Header: 'Status',
            accessor: 'status'
        },
        {
            Header: 'Action',
            accessor: 'action'
        }
    ]

    const columns = useMemo (() => COLUMNS, [])
    const data = useMemo(() => DATA.data || [], [DATA]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        setGlobalFilter,
        setPageSize,
        prepareRow,
    } = useTable({
        columns,
        data,
        initialState: { pageSize: 6 },
        globalFilter,
    }, useGlobalFilter,  useSortBy, usePagination)

    const { pageIndex, pageSize} = state

    // Set globalFilter whenever the prop changes
    useEffect(() => {
        setGlobalFilter(globalFilter);
    }, [globalFilter, setGlobalFilter]);


    const [showActionBtn, setShowActionBtn] = useState(null);
    // Toggle the action-btn visibility
    const toggleActionBtn = (rowIndex) => {
        setShowActionBtn((prevIndex) => (prevIndex === rowIndex ? null : rowIndex));
    };


    // function to reset password or deactivating user pop up 
    const [modalTitle, setModalTitle] = useState('');
    const [modalBody, setModalBody] = useState('');
    const [modalType, setModalType] = useState('');
    const [selectedUser, setSelectedUser] = useState(null   );

    const handleActionClick = (actionType, user) => {
        setSelectedUser(user);
            
        if (actionType === 'deactivate') {
            setModalTitle('Deactivate User');
            setModalBody(`Are you sure you want to Deactivate User ${user.name}? Account and data will no longer be accessible.`);
            setModalType('deactivate');
        } else if (actionType === 'reset-password') {
            setModalTitle('Reset Password');
            setModalBody(`Send Reset Password Link to ${user.email}?`);
            setModalType('reset-password');
        }   

        // Show modal 
        const modalElement = document.getElementById('actionModal');
        let modal;
        if (modal) {
            modal.show();
        } else {
            const newModal = new window.bootstrap.Modal(modalElement, {
                backdrop: false,
                focus: true  
            });
            newModal.show();
        }
    };

    const handleModalClose = () => {
        const modalElement = document.getElementById('actionModal');
        const modal = window.bootstrap.Modal.getInstance(modalElement);
        modal.hide();
        setSelectedUser(null);
    };

    const handleModalAction = () => {
        if (modalType === 'deactivate') {
            alert(`User ${selectedUser.name} deactivated.`);
        } else if (modalType === 'reset-password') {
            alert(`Password reset link sent to ${selectedUser.email}`);
        }
        handleModalClose();
    };



  return (
    <>
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())} key={column.id}> 
                                {column.render('Header')} 
                                <span>
                                    {column.isSorted ? (column.isSortedDesc ? '🔽' : '🔼') : ''}
                                </span>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>

            <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()} key={row.id}>
                        {row.cells.map((cell) => {
                            const className = cell.column.id === 'id' ? 'id-column' : '';

                            // add border class based on the status value
                            let statusClass = '';
                            if (cell.column.id === 'status') {
                                const statusValue = (cell.value || '').toLowerCase();
                                
                                if (statusValue === 'active') {
                                    statusClass = 'active-border';
                                } else if (statusValue === 'deactivated') {
                                    statusClass = 'deactive-border';
                                } else if (statusValue === 'inactive') {
                                    statusClass = 'inactive-border';
                                }
                            }

                            return (
                                <td {...cell.getCellProps()} key={cell.column.id} className={className}>
                                    {cell.column.id === 'status' ? (
                                        <div className={statusClass}>{cell.render('Cell')}</div>
                                    ) : cell.column.id === 'action' ? (
                                        <div className="action-div d-flex align-items-center justify-content-center">
                                            <img className='cursor-pointer' onClick={() => toggleActionBtn(index)} src={'/images/user_management/action-btn.svg'} alt='action-btn' />

                                            {showActionBtn === index && (
                                                <div className="action-popup d-flex flex-column">
                                                    <div className="d-flex gap-8px cursor-pointer" onClick={() => alert('Edit clicked')}>
                                                        <img className='action-icon'  src={'/images/user_management/action-edit-btn.svg'} alt='action-edit-btn' />

                                                        <div>Edit</div>
                                                    </div>

                                                    <div className="d-flex gap-8px cursor-pointer" onClick={() => handleActionClick('deactivate', row.original)}>
                                                        <img className='action-icon'  src={'/images/user_management/action-deactivate-btn.svg'} alt='action-deactivate-btn' />

                                                        <div>Deactivate</div>
                                                    </div>

                                                    <div className="d-flex gap-8px cursor-pointer" onClick={() => handleActionClick('reset-password', row.original)}>
                                                        <img className='action-icon' src={'/images/user_management/action-password-btn.svg'} alt='action-password-btn' />

                                                        <div>Reset Password</div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        cell.render('Cell')
                                    )}
                                    </td>
                            );
                        })}
                    </tr>
                );
            })}
            </tbody>
        </table>

        <div className="table-footer-div d-flex align-items-center justify-content-end">
            <div className="row-per-page">
                Rows per page:
                <select className="row-per-page-bold" value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                    {[4,5,6].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <div className="footer-page-number">
                <span className="bold-page-number">{pageIndex + 1}</span>{' '}of {pageOptions.length}
            </div>
            <div className="d-flex">
                <div className={`previous-pointer cursor-pointer ${!canPreviousPage ? 'deactivated-pointer' : ''}`} onClick={() => previousPage()}>&lt;</div>
                <div className={`next-pointer cursor-pointer ${!canNextPage ? 'deactivated-pointer' : ''}`} onClick={() => nextPage()}>&gt;</div>
            </div>
        </div>

        {/* Bootstrap Modal for Deactivate or Reset Password */}
        <div className="modal" id="actionModal" tabIndex="-1" aria-labelledby="actionModalLabel">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="actionModalLabel">{modalTitle}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleModalClose}></button>
                    </div>
                    <div className="modal-body">
                        {modalBody}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleModalClose}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={handleModalAction}>
                            {modalType === 'deactivate' ? 'Deactivate' : 'Send'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default DashboardPage;