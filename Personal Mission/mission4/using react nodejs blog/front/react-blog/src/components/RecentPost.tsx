import sample5 from "../assets/sample5.svg";
const RecentPost = () => {
  return (
    <section className="grid grid-cols-3">
      <article>
        <span>인터뷰</span>
        <img src={sample5} alt="thumbnail"></img>
        <h1>2024.08.13 TIL</h1>
      </article>
      <article>
        <span>인터뷰</span>
        <img src={sample5} alt="thumbnail"></img>
        <h1>2024.08.13 TIL</h1>
      </article>
      <article>
        <span>인터뷰</span>
        <img src={sample5} alt="thumbnail"></img>
        <h1>2024.08.13 TIL</h1>
      </article>
      <article>
        <span>인터뷰</span>
        <img src={sample5} alt="thumbnail"></img>
        <h1>2024.08.13 TIL</h1>
      </article>
    </section>
  );
};
export default RecentPost;
