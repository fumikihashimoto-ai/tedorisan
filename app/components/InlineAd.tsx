export default function InlineAd() {
  return (
    <div className="my-8 flex justify-center">
      {/* PC: 2つ横並び */}
      <div className="hidden md:flex gap-4 justify-center">
        {/* 広告1 */}
        <div>
          <a href="https://px.a8.net/svt/ejp?a8mat=4AVF01+4EDBOY+3Y6M+BXQOH" rel="nofollow">
            <img width={300} height={250} alt="" src="https://www22.a8.net/svt/bgt?aid=260126641266&wid=001&eno=01&mid=s00000018427002005000&mc=1" />
          </a>
          <img width={1} height={1} src="https://www11.a8.net/0.gif?a8mat=4AVF01+4EDBOY+3Y6M+BXQOH" alt="" />
        </div>
        {/* 広告2 */}
        <div>
          <a href="https://px.a8.net/svt/ejp?a8mat=4AVF01+4TULF6+5B0Y+HVNAP" rel="nofollow">
            <img width={300} height={250} alt="" src="https://www24.a8.net/svt/bgt?aid=260126641292&wid=001&eno=01&mid=s00000024757003003000&mc=1" />
          </a>
          <img width={1} height={1} src="https://www19.a8.net/0.gif?a8mat=4AVF01+4TULF6+5B0Y+HVNAP" alt="" />
        </div>
      </div>

      {/* スマホ: 広告1のみ */}
      <div className="md:hidden">
        <a href="https://px.a8.net/svt/ejp?a8mat=4AVF01+4EDBOY+3Y6M+BXQOH" rel="nofollow">
          <img width={300} height={250} alt="" src="https://www22.a8.net/svt/bgt?aid=260126641266&wid=001&eno=01&mid=s00000018427002005000&mc=1" />
        </a>
        <img width={1} height={1} src="https://www11.a8.net/0.gif?a8mat=4AVF01+4EDBOY+3Y6M+BXQOH" alt="" />
      </div>
    </div>
  );
}
