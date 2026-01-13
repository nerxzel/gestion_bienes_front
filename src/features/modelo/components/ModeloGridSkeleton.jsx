import SkeletonCell from '../../common/SkeletonCell.jsx';

function ModeloGridSkeleton() {
    let placeholderList = Array(10).fill('Texto Ejemplo')

    let randomWidth = (min, max) => { return `${Math.floor(Math.random() * (max - min + 1) + min)}px` }

    return (
        <>
            <div className='table-responsive'>
                <table className="table table-striped table-bordered table-hover table-sm table-layout-fixed">
                    <thead>
                        <tr>
                            <th>Modelos</th>
                            <th>Marca a la que pertenece</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {placeholderList.map((elemento, index) => (
                            <tr key={index}>
                                <td className='truncate-cell'><SkeletonCell width={randomWidth(100, 150)} height='15px' className='rounded-2'></SkeletonCell></td>
                                <td className='truncate-cell'><SkeletonCell width={randomWidth(100, 150)} height='15px' className='rounded-2'></SkeletonCell></td>
                                <td className="text-nowrap">
                                    <SkeletonCell width='32px' height='32px' className='me-3 rounded'></SkeletonCell>
                                </td>
                            </tr>))}
                    </tbody>

                </table>
            </div>

        </>
    );
}

export default ModeloGridSkeleton;