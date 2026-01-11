import SkeletonCell from '../../common/SkeletonCell.jsx';

function BienGridSkeleton() {
    let placeholderList = Array(10).fill('Texto Ejemplo')
    return (
        <>
            <div className='table-responsive'>
                <table className='table table-striped table-bordered table-hover table-sm table-layout-fixed'>
                    <thead>
                        <tr>
                            <th className="truncate-cell" title='Código Inventario'>Código Inv</th>
                            <th className="truncate-cell" title='Descripción Corta'>Descripción Corta</th>
                            <th className="truncate-cell" title='Grupo'>Grupo</th>
                            <th className="truncate-cell" title='Clase'>Clase</th>
                            <th className="truncate-cell" title='Subclase'>Subclase</th>
                            <th className="truncate-cell" title='Fecha Ingreso'>Fecha Ingreso</th>
                            <th className="truncate-cell" title='Condición'>Condición</th>
                            <th className="truncate-cell" title='Estado'>Estado</th>
                            <th className="truncate-cell" title='Última Depreciación'>Última Depreciación</th>
                            <th className="truncate-cell" title='Valor'>Valor</th>
                            <th className="truncate-cell" title='Acciones'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {placeholderList.map((elemento, index) => (
                            <tr key={index}>
                                <td className="truncate-cell"><SkeletonCell width='70px' height='15px' className='rounded-2'></SkeletonCell></td>
                                <td className="truncate-cell"><SkeletonCell width='100px' height='15px' className='rounded-2'></SkeletonCell></td>
                                <td className="truncate-cell"><SkeletonCell width='70px' height='15px' className='rounded-2'></SkeletonCell></td>
                                <td className="truncate-cell"><SkeletonCell width='100px' height='15px' className='rounded-2'></SkeletonCell></td>
                                <td className="truncate-cell"><SkeletonCell width='70px' height='15px' className='rounded-2'></SkeletonCell></td>
                                <td className="truncate-cell"><SkeletonCell width='70px' height='15px' className='rounded-2'></SkeletonCell></td>
                                <td className="truncate-cell"><SkeletonCell width='70px' height='15px' className='rounded-2'></SkeletonCell></td>
                                <td className="truncate-cell"><SkeletonCell width='70px' height='15px' className='rounded-2'></SkeletonCell></td>
                                <td className="truncate-cell"><SkeletonCell width='70px' height='15px' className='rounded-2'></SkeletonCell></td>
                                <td className="truncate-cell"><SkeletonCell width='70px' height='15px' className='rounded-2'></SkeletonCell></td>
                                <td className="text-nowrap text-center">
                                    <SkeletonCell width='32px' height='32px' className='me-2 rounded'></SkeletonCell>
                                    <SkeletonCell width='32px' height='32px' className='me-2 rounded'></SkeletonCell>
                                    <SkeletonCell width='32px' height='32px' className='me-2 rounded'></SkeletonCell>
                                </td>
                            </tr>))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default BienGridSkeleton;