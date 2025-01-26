import sampledata from "@/data/sampledata.json";
import Grid from "@/components/ui/layout/Grid";
import RaqisCard from "@/components/cards/RaqisCard";

function test() {
  return <Grid>{sampledata && sampledata.map((data) => <RaqisCard key={data.id} raqi={data} />)}</Grid>;
}


export default test;