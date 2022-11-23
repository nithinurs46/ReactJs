import classes from './HighlightedView.module.css'

const HighlightedView=(props)=>{
    return (
        <figure className={classes.task}>
          <p>{props.name}</p>
          <figcaption>{props.description}</figcaption>
        </figure>
      );
}

export default HighlightedView;