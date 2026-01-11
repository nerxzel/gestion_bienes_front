
function SkeletonCell({ width, height, className }) {

    const styles = {
        width: width || '100px',
        height: height || '10px',
        display: 'inline-block',
        opacity: 0.2
    }

    return (
        <span className={`placeholder placeholder-wave ${className || ''}`}
            style={styles}
            aria-hidden="true"></span>
    );
}

export default SkeletonCell;