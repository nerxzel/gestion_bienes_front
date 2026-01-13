import SkeletonCell from '../../common/SkeletonCell.jsx';

function ResponsableGridSkeleton() {
    let placeholderList = Array(10).fill('Texto Ejemplo')

    let randomWidth = (min, max) => { return `${Math.floor(Math.random() * (max - min + 1) + min)}%` }

    return (
        <>
            <div className='table-responsive'>
                <table className="table table-striped table-bordered table-hover table-sm table-layout-fixed">
                    <thead>
                        <tr>
                            <th>Nombre responsable</th>
                            <th>Rut</th>
                            <th>Cargo</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {placeholderList.map((elemento, index) => (
                            <tr key={index}>
                                <td className="truncate-cell"><SkeletonCell width={randomWidth(65, 80)} height='15px' className='rounded-2'></SkeletonCell></td>
                                <td className="truncate-cell"><SkeletonCell width='100px' height='15px' className='rounded-2'></SkeletonCell></td>
                                <td className="truncate-cell"><SkeletonCell width={randomWidth(65, 80)} height='15px' className='rounded-2'></SkeletonCell></td>
                                <td className="truncate-cell"><SkeletonCell width='100px' height='15px' className='rounded-2'></SkeletonCell></td>
                                <td className="text-nowrap">
                                    <SkeletonCell width='32px' height='32px' className='me-3 rounded'></SkeletonCell>
                                    <SkeletonCell width='32px' height='32px' className='me-2 rounded'></SkeletonCell>

                                </td>
                            </tr>))}
                    </tbody>

                </table>
            </div>

        </>
    );
}

export default ResponsableGridSkeleton;