import { useState } from "react";
import { IoChevronUp } from "react-icons/io5";

interface Experience {
	id: number;
	organization: string;
	role: string;
	logo: string;
	startDate: string;
	endDate: string;
	location: string;
	responsibilities: string[];
	technologies: string[];
}

interface ExperienceCardProps {
	experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpand = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div className="flex flex-col items-start pt-2">
			<div
				className="group relative -mx-3 w-full transform rounded-lg  px-3 py-3 transition-all duration-300 ease-in-out md:hover:bg-hoverColor/30">
				{/* Header */}
				<div
					className="flex cursor-pointer items-start justify-between"
					onClick={toggleExpand}>
					{/* Left side: Logo, Organization, Role */}
					<div className="flex items-start gap-3">
						{/* Logo placeholder - square with border */}
						<div className="border-body/20 mt-0.5 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded border bg-white">
							{experience.logo ? (
								<img src={experience.logo} alt={experience.organization} className="h-8 w-8" />
							) : (
								<div className="flex h-8 w-8 items-center justify-center rounded bg-yellow-100">
									<span className="text-xs font-semibold text-yellow-700">&lt;/&gt;</span>
								</div>
							)}
						</div>
						<div className="flex flex-col">
							<h3 className="text-title text-sm font-bold tracking-tight">{experience.organization}</h3>
							<p className="text-body text-sm font-normal tracking-tight">{experience.role}</p>
						</div>
					</div>

					{/* Right side: Dates, Location, Toggle */}
					<div className="flex items-start gap-3">
						<div className="flex flex-col items-end">
							<p className="text-title text-sm font-normal tracking-tight">
								{experience.startDate} - {experience.endDate}
							</p>
							<p className="text-body text-xs font-normal tracking-tight">{experience.location}</p>
						</div>
						<button
							type="button"
							aria-label={isExpanded ? "Collapse details" : "Expand details"}
							title={isExpanded ? "Collapse details" : "Expand details"}
							className="text-body mt-0.5 flex-shrink-0 transition-transform duration-200 ease-in-out"
							onClick={(e) => {
								e.stopPropagation();
								toggleExpand();
							}}>
							<IoChevronUp
								className={`h-4 w-4 transition-transform duration-200 ${
									isExpanded ? "rotate-0" : "rotate-180"
								}`}
							/>
						</button>
					</div>
				</div>

				{/* Collapsible Details Section */}
				<div
					className={`overflow-hidden transition-all duration-300 ease-in-out ${
						isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
					}`}>
					<div className="pt-4">
						{/* Responsibilities */}
						<ul className="text-body mb-4 space-y-1.5 pl-4 text-sm">
							{experience.responsibilities.map((responsibility, index) => (
								<li key={index} className="list-disc">
									{responsibility}
								</li>
							))}
						</ul>

						{/* Technology Tags */}
						{/* <div className="flex flex-wrap gap-2">
							{experience.technologies.map((tech, index) => (
								<span
									key={index}
									className="border-body/20 bg-body/10 text-body rounded border px-2 py-0.5 text-xs font-normal">
									{tech}
								</span>
							))}
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
}
