type Props = {
  params: {
    server: string;
    postId: string;
  };
};
export default function Page({ params }: Props) {
  return (
    <div>
      <p>{params.postId}</p>
    </div>
  );
}
